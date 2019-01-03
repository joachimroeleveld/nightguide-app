import { request } from './index';

export function sendFeedback(message) {
  return request({
    skipAuth: true,
    path: '/misc/user-feedback',
    method: 'POST',
    body: {
      message,
    },
  });
}
