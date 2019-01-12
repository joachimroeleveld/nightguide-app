import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import { createActions } from 'redux-actions';

import __ from '../services/i18n';

const SHOW_OK_MESSAGE = 'SHOW_OK_MESSAGE';
const SHOW_WARN_MESSAGE = 'SHOW_WARN_MESSAGE';
const SHOW_ERR_MESSAGE = 'SHOW_ERR_MESSAGE';

export const { showOkMessage, showWarnMessage, showErrMessage } = createActions(
  SHOW_OK_MESSAGE,
  SHOW_WARN_MESSAGE,
  SHOW_ERR_MESSAGE
);

export default handleActions(
  {
    [showOkMessage]: (state, action) =>
      update(state, {
        $push: [
          {
            type: 'ok',
            text: action.payload.message || action.payload,
            duration: action.payload.duration,
          },
        ],
      }),
    [showWarnMessage]: (state, action) =>
      update(state, {
        $push: [
          {
            type: 'warn',
            text: action.payload.message || action.payload,
            duration: action.payload.duration,
          },
        ],
      }),
    [showErrMessage]: (state, action) => {
      const err =
        typeof action.payload === 'string'
          ? action.payload
          : action.payload.err;

      let text = typeof err === 'string' ? err : __('genericErrorTitle');

      const details =
        err instanceof Error
          ? err.message || err.toString()
          : action.payload.details;

      if (details) text += ` (${details})`;

      return update(state, {
        $push: [
          {
            type: 'err',
            text: text,
            duration: action.payload.duration,
          },
        ],
      });
    },
  },
  []
);
