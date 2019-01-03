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
  SEND_FEEDBACK,
  sendFeedbackError,
  sendFeedbackSuccess,
} from './actions';

export function* signup() {
  yield takeLatest(SIGNUP, function*(action) {
    try {
      yield call(api.users.signup, action.payload);

      yield put(signupSuccess());
    } catch (e) {
      yield put(signupError(e));
    }
  });
}

export function* login() {
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

export function* facebookLogin() {
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

export function* resetPassword() {
  yield takeLatest(RESET_PASSWORD, function*(action) {
    try {
      yield call(api.users.resetPassword, { email: action.payload.email });

      yield put(resetPasswordSuccess());
    } catch (e) {
      yield put(resetPasswordError(e));
    }
  });
}

export function* sendFeedback() {
  yield takeLatest(SEND_FEEDBACK, function*(action) {
    try {
      yield call(api.misc.sendFeedback, action.payload);

      yield put(sendFeedbackSuccess());
    } catch (e) {
      yield put(sendFeedbackError(e));
    }
  });
}

export default function* root() {
  yield [
    fork(signup),
    fork(login),
    fork(facebookLogin),
    fork(resetPassword),
    fork(sendFeedback),
  ];
}
