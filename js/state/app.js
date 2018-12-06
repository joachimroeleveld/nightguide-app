import { combineReducers } from 'redux';
import { createActions } from 'redux-actions';

import { LOGOUT } from './account/actions';
import accountReducer from './account/reducer';
import messagesReducer from './messages/reducer';

export const INITIALIZE_APP = 'INITIALIZE_APP';

export const { initializeApp } = createActions(INITIALIZE_APP);

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    return rootReducer(undefined, {}); // Return initial state
  }

  return combineReducers({
    account: accountReducer,
    messages: messagesReducer,
  })(state, action);
};

export default rootReducer;
