import { combineReducers } from 'redux';
import { createActions } from 'redux-actions';
import _ from 'lodash';
import storage from 'redux-persist/lib/storage';
import DeviceInfo from 'react-native-device-info';

import { logout, LOGOUT } from './account/actions';
import accountReducer from './account/reducer';
import messagesReducer from './messages';
import venuesReducer from './venues/reducer';
import permissionsReducer from './permissions';
import feedbackReducer from './feedback';
import locationReducer from './location';

export const INITIALIZE_APP = 'INITIALIZE_APP';
export const { initializeApp } = createActions(INITIALIZE_APP);

const persistConfig = {
  storage,
  version: DeviceInfo.getBuildNumber(),
};

const reducers = {
  messages: messagesReducer,
  venues: venuesReducer,
  feedback: feedbackReducer,
  location: locationReducer,
};

const persistedReducers = {
  account: accountReducer(persistConfig),
  permissions: permissionsReducer(persistConfig),
};

function handleLogout(state) {
  const toKeep = _.cloneDeep({
    permissions: state.permissions,
    location: state.location,
  });
  // Non-persisted reducers are reset by passing undefined as state. Persisted
  // reducers by passing a logout action (redux-persist doesn't support passing
  // undefined as state to reducers)
  const reducerState = combineReducers(reducers)(undefined, {});
  const persistedReducerState = combineReducers(persistedReducers)(
    _.pick(state, Object.keys(persistedReducers)),
    logout()
  );
  return _.merge(reducerState, persistedReducerState, toKeep);
}

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    return handleLogout(state);
  }

  return combineReducers({
    ...reducers,
    ...persistedReducers,
  })(state, action);
};

export default rootReducer;
