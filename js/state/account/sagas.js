import { put, fork, takeLatest, call } from 'redux-saga/effects';

import api from '../../services/api';
import facebook from '../../services/facebook';
import {
  LOGIN,
  LOGIN_FB,
  loginRequest,
  loginError,
  loginFbDialog,
  loginFbCancel,
  loginFbError,
  setAccount,
} from './actions';

export function* login() {
  yield takeLatest(LOGIN, function*(action) {
    yield put(loginRequest());

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

export default function* root() {
  yield [fork(login), fork(facebookLogin)];
}
