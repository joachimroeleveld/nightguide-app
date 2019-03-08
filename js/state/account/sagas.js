import { call, fork, put, takeLatest } from 'redux-saga/effects';

import api from '../../services/api';
import { eventBus } from '../../services/analytics';
import facebook from '../../services/facebook';
import {
  LOGIN,
  LOGIN_FB,
  loginError,
  loginFbCancel,
  loginFbDialog,
  loginFbError,
  RESET_PASSWORD,
  resetPasswordError,
  resetPasswordSuccess,
  setAccount,
  SIGNUP,
  signupError,
  signupSuccess,
} from './actions';

function* signupSaga() {
  yield takeLatest(SIGNUP, function*(action) {
    try {
      yield call(api.users.signup, action.payload);
      eventBus.signup({ method: eventBus.PARAM_SIGNUP_METHOD_NORMAL });

      yield put(signupSuccess());
    } catch (e) {
      yield put(signupError(e));
    }
  });
}

function* loginSaga() {
  yield takeLatest(LOGIN, function*(action) {
    try {
      const response = yield call(
        api.users.login,
        action.payload.email,
        action.payload.password
      );
      eventBus.login({
        method: eventBus.PARAM_LOGIN_METHOD_NORMAL,
        userId: response.user.id,
      });

      yield put(setAccount(response));
    } catch (e) {
      if (e.type === 'incorrect_credentials') {
        eventBus.loginWithIncorrectCredentials();
      }
      yield put(loginError(e));
    }
  });
}

function* facebookLoginSaga() {
  yield takeLatest(LOGIN_FB, function*(action) {
    yield put(loginFbDialog());

    try {
      const { credentials } = yield call(facebook.showLoginDialog);

      const { permissions, token, userId } = credentials;

      const response = yield call(api.users.loginWithFacebook, {
        permissions,
        token,
        userId,
      });
      if (response.isNew) {
        eventBus.signup({ method: eventBus.PARAM_SIGNUP_METHOD_FACEBOOK });
      } else {
        eventBus.login({
          userId: response.user.id,
          method: eventBus.PARAM_LOGIN_METHOD_FACEBOOK,
        });
      }

      yield put(setAccount(response));
    } catch (e) {
      if (e === 'Cancel') {
        return yield put(loginFbCancel());
      }
      yield put(loginFbError(e));
    }
  });
}

function* resetPasswordSaga() {
  yield takeLatest(RESET_PASSWORD, function*(action) {
    try {
      const { email } = action.payload;
      yield call(api.users.resetPassword, { email });
      eventBus.resetPassword();

      yield put(resetPasswordSuccess());
    } catch (e) {
      yield put(resetPasswordError(e));
    }
  });
}

export default function* rootSaga() {
  yield [
    fork(signupSaga),
    fork(loginSaga),
    fork(facebookLoginSaga),
    fork(resetPasswordSaga),
  ];
}
