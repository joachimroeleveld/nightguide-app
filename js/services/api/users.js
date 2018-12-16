import { request } from './index';

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
