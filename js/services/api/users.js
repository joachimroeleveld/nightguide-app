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
  const body = {
    email,
    password,
    firstName,
    lastName,
    birthday: formatDate(birthday),
  };
  if (gender) {
    body.gender = gender;
  }
  return request({
    path: '/users',
    method: 'POST',
    body,
  });
}

export function login(email, password) {
  return request({
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
    path: '/users/send-password-reset',
    method: 'POST',
    body: {
      email,
    },
  });
}
