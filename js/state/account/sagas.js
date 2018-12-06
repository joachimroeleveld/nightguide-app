import { put, fork, takeEvery, call } from 'redux-saga/effects';

import api from '../../services/api';
import { LOGIN, loginRequest, loginError, setAccount } from './actions';

export function* login() {
  yield takeEvery(LOGIN, function*(action) {
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

export default function* root() {
  yield fork(login);
}
