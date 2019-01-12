import { createActions, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import update from 'immutability-helper';

import api from '../services/api';

const SEND_FEEDBACK = 'SEND_FEEDBACK';
const SEND_FEEDBACK_SUCCESS = 'SEND_FEEDBACK_SUCCESS';
const SEND_FEEDBACK_ERROR = 'SEND_FEEDBACK_ERROR';

export const {
  sendFeedback,
  sendFeedbackSuccess,
  sendFeedbackError,
} = createActions(
  SEND_FEEDBACK,
  SEND_FEEDBACK_SUCCESS,
  SEND_FEEDBACK_ERROR,
);

export function* sendFeedbackSaga() {
  yield takeLatest(SEND_FEEDBACK, function*(action) {
    try {
      yield call(api.misc.sendFeedback, action.payload);

      yield put(sendFeedbackSuccess());
    } catch (e) {
      yield put(sendFeedbackError(e));
    }
  });
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
