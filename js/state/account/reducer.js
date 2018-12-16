import { handleActions } from 'redux-actions';
import update from 'immutability-helper';

import {
  setAccount,
  loginRequest,
  loginError,
  loginFbDialog,
  loginFbError,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordError,
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
          error: { $set: action.payload },
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
          error: { $set: action.payload },
        },
      }),
    [resetPasswordRequest]: (state, action) =>
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
    resetPassword: {
      isFetching: false,
      success: false,
      error: null,
    },
    signup: {
      isFetching: false,
      success: false,
      error: null,
    },
    token: null,
    userId: null,
    email: null,
  }
);
