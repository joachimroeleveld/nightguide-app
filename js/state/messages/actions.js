import { createActions } from 'redux-actions';

const SHOW_OK_MESSAGE = 'SHOW_OK_MESSAGE';
const SHOW_WARN_MESSAGE = 'SHOW_WARN_MESSAGE';
const SHOW_ERR_MESSAGE = 'SHOW_ERR_MESSAGE';

export const { showOkMessage, showWarnMessage, showErrMessage } = createActions(
  SHOW_OK_MESSAGE,
  SHOW_WARN_MESSAGE,
  SHOW_ERR_MESSAGE
);
