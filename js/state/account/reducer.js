import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import { persistReducer } from 'redux-persist';

import {
  login,
  loginError,
  loginFbCancel,
  loginFbDialog,
  loginFbError,
  resetPassword,
  resetPasswordError,
  resetPasswordSuccess,
  setAccount,
  signup,
  signupError,
  signupSuccess,
  logout,
} from './actions';

const INITIAL_STATE = {
  signup: {
    isFetching: false,
    success: false,
    error: null,
  },
  login: {
    isFetching: false,
    error: null,
  },
  fbLogin: {
    error: null,
  },
  resetPassword: {
    isFetching: false,
    success: false,
    error: null,
  },
  user: {},
  token: null,
};

const reducer = handleActions(
  {
    [signup]: (state, action) =>
      update(state, {
        signup: {
          isFetching: { $set: true },
          error: { $set: null },
          success: { $set: false },
        },
      }),
    [signupSuccess]: (state, action) =>
      update(state, {
        signup: {
          isFetching: { $set: false },
          success: { $set: true },
        },
      }),
    [signupError]: (state, action) =>
      update(state, {
        signup: {
          isFetching: { $set: false },
          error: { $set: action.payload },
        },
      }),
    [login]: (state, action) =>
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
          error: { $set: action.payload },
        },
      }),
    [loginFbDialog]: (state, action) =>
      update(state, {
        fbLogin: {
          isFetching: { $set: true },
          error: { $set: null },
        },
      }),
    [loginFbCancel]: (state, action) =>
      update(state, {
        fbLogin: {
          isFetching: { $set: false },
        },
      }),
    [loginFbError]: (state, action) =>
      update(state, {
        fbLogin: {
          error: { $set: action.payload },
        },
      }),
    [resetPassword]: (state, action) =>
      update(state, {
        resetPassword: {
          isFetching: { $set: true },
          error: { $set: null },
          success: { $set: false },
        },
      }),
    [resetPasswordSuccess]: (state, action) =>
      update(state, {
        resetPassword: {
          isFetching: { $set: false },
          success: { $set: true },
        },
      }),
    [resetPasswordError]: (state, action) =>
      update(state, {
        resetPassword: {
          isFetching: { $set: false },
          error: { $set: action.payload },
        },
      }),
    [setAccount]: (state, action) =>
      update(state, {
        login: {
          isFetching: { $set: false },
          error: { $set: null },
        },
        fbLogin: {
          error: { $set: null },
        },
        token: { $set: action.payload.token },
        user: { $set: action.payload.user },
      }),
    [logout]: () => INITIAL_STATE,
  },
  INITIAL_STATE
);

export default persistConfig =>
  persistReducer(
    {
      ...persistConfig,
      key: 'account',
      whitelist: ['token', 'user'],
    },
    reducer
  );
