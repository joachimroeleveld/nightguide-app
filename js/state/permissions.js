import { createActions, handleActions } from 'redux-actions';
import update from 'immutability-helper';
import { persistReducer } from 'redux-persist';
import { createSelector } from 'reselect';

import { logout } from './account/actions';

export const SET_PERMISSION = 'SET_PERMISSION';

export const { setPermission } = createActions(SET_PERMISSION);

const permissionSelector = (state, permission) => state.permissions[permission];

export const getHasPermission = createSelector(
  permissionSelector,
  permission => permission === 'authorized'
);

const INITIAL_STATE = {
  location: null,
};

const reducer = handleActions(
  {
    [setPermission]: (state, action) =>
      update(state, {
        [action.payload.type]: {
          $set: action.payload.value,
        },
      }),
    [logout]: state => state, // Keep permissions
  },
  INITIAL_STATE
);

export default persistConfig =>
  persistReducer(
    {
      ...persistConfig,
      key: 'permissions',
    },
    reducer
  );
