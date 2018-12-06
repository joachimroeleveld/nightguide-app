import { fork } from 'redux-saga/effects';

import accountSagas from './account/sagas';

export default function* root() {
  yield [
    fork(accountSagas),
  ];
}