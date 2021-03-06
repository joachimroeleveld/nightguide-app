import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery, fork } from 'redux-saga/effects';
import update from 'immutability-helper';

import { eventBus } from '../services/analytics';

import api from '../services/api';

const SEND_FEEDBACK = 'SEND_FEEDBACK';
const SEND_FEEDBACK_SUCCESS = 'SEND_FEEDBACK_SUCCESS';
const SEND_FEEDBACK_ERROR = 'SEND_FEEDBACK_ERROR';

export const {
  sendFeedback,
  sendFeedbackSuccess,
  sendFeedbackError,
} = createActions(SEND_FEEDBACK, SEND_FEEDBACK_SUCCESS, SEND_FEEDBACK_ERROR);

function* sendFeedbackSaga() {
  yield takeEvery(SEND_FEEDBACK, function*(action) {
    try {
      yield call(api.misc.sendFeedback, action.payload);
      eventBus.submitFeedback();

      yield put(sendFeedbackSuccess());
    } catch (e) {
      yield put(sendFeedbackError(e));
    }
  });
}

export function* sagas() {
  yield [fork(sendFeedbackSaga)];
}

export default handleActions(
  {
    [sendFeedback]: (state, action) =>
      update(state, {
        isFetching: { $set: true },
        error: { $set: null },
        success: { $set: false },
      }),
    [sendFeedbackSuccess]: (state, action) =>
      update(state, {
        isFetching: { $set: false },
        success: { $set: true },
      }),
    [sendFeedbackError]: (state, action) =>
      update(state, {
        isFetching: { $set: false },
        error: { $set: action.payload },
      }),
  },
  {
    isFetching: false,
    success: false,
    error: null,
  }
);
