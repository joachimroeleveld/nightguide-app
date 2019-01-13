import { createActions, handleActions } from 'redux-actions';
import update from 'immutability-helper';
import { persistReducer } from 'redux-persist';

import { logout } from './account/actions';

export const SET_PERMISSION = 'SET_PERMISSION';

export const { setPermission } = createActions(SET_PERMISSION);

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
    [logout]: () => INITIAL_STATE,
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
