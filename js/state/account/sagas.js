import { call, fork, put, takeLatest } from 'redux-saga/effects';

import api from '../../services/api';
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

      yield put(setAccount(response));
    } catch (e) {
      yield put(loginError(e));
    }
  });
}

function* facebookLoginSaga() {
  yield takeLatest(LOGIN_FB, function*(action) {
    yield put(loginFbDialog());

    try {
      const { credentials, isCancelled } = yield call(facebook.showLoginDialog);

      if (isCancelled) {
        return yield put(loginFbCancel());
      }

      const { permissions, token, userId } = credentials;

      const response = yield call(api.users.loginWithFacebook, {
        permissions,
        token,
        userId,
      });

      yield put(setAccount(response));
    } catch (e) {
      yield put(loginFbError(e));
    }
  });
}

function* resetPasswordSaga() {
  yield takeLatest(RESET_PASSWORD, function*(action) {
    try {
      yield call(api.users.resetPassword, { email: action.payload.email });

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
