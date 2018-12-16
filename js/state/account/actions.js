import { createActions } from 'redux-actions';

export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGIN_FB = 'LOGIN_FB';
export const LOGIN_FB_DIALOG = 'LOGIN_FB_DIALOG';
export const LOGIN_FB_CANCEL = 'LOGIN_FB_CANCEL';
export const LOGIN_FB_ERROR = 'LOGIN_FB_ERROR';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

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
  resetPassword,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordError,
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
  RESET_PASSWORD,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  SET_ACCOUNT,
  LOGOUT,
);
