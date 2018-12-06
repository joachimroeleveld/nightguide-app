import { handleActions } from 'redux-actions';
import update from 'immutability-helper';

import { setAccount, loginRequest, loginError } from './actions';

export default handleActions(
  {
    [loginRequest]: (state, action) =>
      update(state, {
        fetchError: { $set: null },
        isFetching: { $set: false },
      }),
    [loginError]: (state, action) =>
      update(state, {
        isFetching: { $set: false },
        fetchError: { $set: action.payload.message },
      }),
    [setAccount]: (state, action) =>
      update(state, {
        isFetching: { $set: false },
        token: { $set: action.payload.token },
        userId: { $set: action.payload.user.id },
        email: { $set: action.payload.user.email },
      }),
  },
  {
    isFetching: false,
    fetchError: null,
    token: null,
    userId: null,
    email: null,
  }
);