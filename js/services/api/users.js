import { request } from './index';
import { formatDate } from './util';

export function signup({
  email,
  password,
  firstName,
  lastName,
  gender,
  birthday,
}) {
  return request({
    skipAuth: true,
    path: '/users',
    method: 'POST',
    body: {
      email,
      password,
      firstName,
      lastName,
      gender,
      birthday: formatDate(birthday),
    },
  });
}

export function login(email, password) {
  return request({
    skipAuth: true,
    path: '/users/login',
    method: 'POST',
    body: {
      email,
      password,
    },
  });
}

export function loginWithFacebook({ token, permissions, userId }) {
  return request({
    skipAuth: true,
    path: '/users/login-fb',
    method: 'POST',
    body: {
      token,
      permissions,
      userId,
    },
  });
}

export function resetPassword({ email }) {
  return request({
    skipAuth: true,
    path: '/users/send-password-reset',
    method: 'POST',
    body: {
      email,
    },
  });
}
