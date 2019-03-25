import { request } from './index';

export function sendFeedback(message) {
  return request({
    path: '/misc/user-feedback',
    method: 'POST',
    body: {
      message,
    },
  });
}
