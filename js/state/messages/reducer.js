import { handleActions } from 'redux-actions';
import update from 'immutability-helper';

import __ from '../../services/i18n';

import { showOkMessage, showWarnMessage, showErrMessage } from './actions';

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

      let text =
        typeof err === 'string' ? err : __('common.genericErrorMessage');

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
