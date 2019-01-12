import { fork } from 'redux-saga/effects';

import accountSagas from './account/sagas';
import venuesSagas from './venues/sagas';

export default function* root() {
  yield [
    fork(accountSagas),
    fork(venuesSagas),
  ];
}