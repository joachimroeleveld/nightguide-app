import { combineReducers } from 'redux';
import { createActions } from 'redux-actions';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { LOGOUT } from './account/actions';
import accountReducer from './account/reducer';
import messagesReducer from './messages/reducer';
import venuesReducer from './venues/reducer';

export const INITIALIZE_APP = 'INITIALIZE_APP';

export const { initializeApp } = createActions(INITIALIZE_APP);

const persistedAccountReducer = persistReducer(
  {
    key: 'auth',
    storage,
    whitelist: ['token', 'user'],
  },
  accountReducer
);

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    return rootReducer(undefined, {}); // Return initial state
  }

  return combineReducers({
    account: persistedAccountReducer,
    messages: messagesReducer,
    venues: venuesReducer,
  })(state, action);
};

export default rootReducer;
