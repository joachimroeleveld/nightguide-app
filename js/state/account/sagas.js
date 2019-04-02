import { call, fork, put, takeEvery } from 'redux-saga/effects';

import api from '../../services/api';
import { eventBus } from '../../services/analytics';
import facebook from '../../services/facebook';
import {
  LOGIN,
  LOGIN_ANONYMOUS,
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
  yield takeEvery(SIGNUP, function*(action) {
    try {
      yield call(api.users.signup, action.payload);
      eventBus.signup({ method: eventBus.PARAM_SIGNUP_METHOD_NORMAL });

      yield put(signupSuccess());
    } catch (e) {
      yield put(signupError(e));
    }
  });
}

function* loginAnonymousSaga() {
  yield takeEvery(LOGIN_ANONYMOUS, function() {
    eventBus.login({
      method: eventBus.PARAM_LOGIN_METHOD_ANONYMOUS,
    });
  });
}

function* loginSaga() {
  yield takeEvery(LOGIN, function*(action) {
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
  yield takeEvery(LOGIN_FB, function*(action) {
    yield put(loginFbDialog());

    try {
      const { isCanceled, token } = yield call(facebook.showLoginDialog);
      if (isCanceled) {
        return yield put(loginFbCancel());
      }

      const { permissions, accessToken, userID } = token;

      const response = yield call(api.users.loginWithFacebook, {
        permissions,
        token: accessToken,
        userId: userID,
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
      yield put(loginFbError(e));
    }
  });
}

function* resetPasswordSaga() {
  yield takeEvery(RESET_PASSWORD, function*(action) {
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
    fork(loginAnonymousSaga),
    fork(facebookLoginSaga),
    fork(resetPasswordSaga),
  ];
}
