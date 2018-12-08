import { handleActions } from 'redux-actions';
import update from 'immutability-helper';

import {
  setAccount,
  loginRequest,
  loginError,
  loginFbDialog,
  loginFbError,
} from './actions';

export default handleActions(
  {
    [loginRequest]: (state, action) =>
      update(state, {
        login: {
          isFetching: { $set: true },
          error: { $set: null },
        },
      }),
    [loginError]: (state, action) =>
      update(state, {
        login: {
          isFetching: { $set: false },
          error: { $set: action.payload.message },
        },
      }),
    [loginFbDialog]: (state, action) =>
      update(state, {
        fbLogin: {
          error: { $set: null },
        },
      }),
    [loginFbError]: (state, action) =>
      update(state, {
        fbLogin: {
          error: { $set: action.payload.message },
        },
      }),
    [setAccount]: (state, action) =>
      update(state, {
        login: {
          isFetching: false,
          error: null,
        },
        fbLogin: {
          error: null,
        },
        token: { $set: action.payload.token },
        userId: { $set: action.payload.user.id },
        email: { $set: action.payload.user.email },
      }),
  },
  {
    login: {
      isFetching: false,
      error: null,
    },
    fbLogin: {
      error: null,
    },
    token: null,
    userId: null,
    email: null,
  }
);
