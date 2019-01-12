import { createActions, handleActions } from 'redux-actions';
import update from 'immutability-helper';

export const SET_PERMISSION = 'SET_PERMISSION';

export const { setPermission } = createActions(SET_PERMISSION);

export default handleActions(
  {
    [setPermission]: (state, action) =>
      update(state, {
        [action.payload.type]: {
          $set: action.payload.value,
        },
      }),
  },
  {
    location: null,
  }
);
