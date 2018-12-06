import { createActions } from 'redux-actions';

export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SET_ACCOUNT = 'SET_ACCOUNT';
export const LOGOUT = 'LOGOUT';

export const {
  login,
  loginRequest,
  loginError,
  setAccount,
  logout,
} = createActions(
  LOGIN,
  LOGIN_REQUEST,
  LOGIN_ERROR,
  SET_ACCOUNT,
  LOGOUT,
);
