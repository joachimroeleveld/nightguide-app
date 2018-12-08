import { createActions } from 'redux-actions';

export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGIN_FB = 'LOGIN_FB';
export const LOGIN_FB_DIALOG = 'LOGIN_FB_DIALOG';
export const LOGIN_FB_CANCEL = 'LOGIN_FB_CANCEL';
export const LOGIN_FB_ERROR = 'LOGIN_FB_ERROR';

export const SET_ACCOUNT = 'SET_ACCOUNT';
export const LOGOUT = 'LOGOUT';

export const {
  login,
  loginRequest,
  loginError,
  loginFb,
  loginFbDialog,
  loginFbCancel,
  loginFbError,
  setAccount,
  logout,
} = createActions(
  LOGIN,
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_FB,
  LOGIN_FB_DIALOG,
  LOGIN_FB_CANCEL,
  LOGIN_FB_ERROR,
  SET_ACCOUNT,
  LOGOUT,
);
