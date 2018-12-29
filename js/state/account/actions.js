import { createActions } from 'redux-actions';

export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

export const LOGIN = 'LOGIN';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGIN_FB = 'LOGIN_FB';
export const LOGIN_FB_DIALOG = 'LOGIN_FB_DIALOG';
export const LOGIN_FB_CANCEL = 'LOGIN_FB_CANCEL';
export const LOGIN_FB_ERROR = 'LOGIN_FB_ERROR';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export const SET_ACCOUNT = 'SET_ACCOUNT';
export const REFRESH_ACCOUNT = 'REFRESH_ACCOUNT';
export const LOGOUT = 'LOGOUT';

export const {
  signup,
  signupSuccess,
  signupError,
  login,
  loginError,
  loginFb,
  loginFbDialog,
  loginFbCancel,
  loginFbError,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordError,
  setAccount,
  refreshAccount,
  logout,
} = createActions(
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_FB,
  LOGIN_FB_DIALOG,
  LOGIN_FB_CANCEL,
  LOGIN_FB_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  SET_ACCOUNT,
  REFRESH_ACCOUNT,
  LOGOUT
);
