import { fork } from 'redux-saga/effects';

import accountSagas from './account/sagas';
import venuesSagas from './venues/sagas';
import { sagas as feedbackSagas } from './feedback';

export default function* rootSaga() {
  yield [
    fork(accountSagas),
    fork(venuesSagas),
    fork(feedbackSagas)
  ];
}