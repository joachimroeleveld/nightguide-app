import { combineReducers } from 'redux';
import { createActions } from 'redux-actions';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { LOGOUT } from './account/actions';
import accountReducer from './account/reducer';
import messagesReducer from './messages';
import venuesReducer from './venues/reducer';
import permissionsReducer from './permissions';
import feedbackReducer from './feedback';
import locationReducer from './location';

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
    permissions: permissionsReducer,
    feedback: feedbackReducer,
    location: locationReducer,
  })(state, action);
};

const persistedRootReducer = persistReducer(
  {
    key: 'root',
    storage,
    whitelist: ['permissions'],
  },
  rootReducer
);

export default persistedRootReducer;
