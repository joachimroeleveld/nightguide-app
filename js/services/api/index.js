import constants from '../../config/constants';

import * as users from './users';

let token = null;

export function setToken(newToken) {
  token = newToken;
}

export function request({
  path,
  method = 'GET',
  headers = {},
  body,
  skipAuth = false,
}) {
  if (token === null && !skipAuth) {
    throw new Error('no_api_token');
  }

  const opts = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      ...headers,
    },
  };

  if (body) {
    opts.body = JSON.stringify(body);
  }

  return fetch(constants.apiUrl + path, opts).then(async res => {
    const json = await res.json();

    if (!res.ok) {
      throw {
        ...json,
        __api_error__: true,
      };
    }

    return json;
  });
}

export default {
  users,
};
