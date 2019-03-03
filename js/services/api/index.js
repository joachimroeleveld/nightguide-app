import querystring from 'qs';

import constants from '../../config/constants';

import * as users from './users';
import * as misc from './misc';
import * as venues from './venues';
import NgApiError from './NgApiError';

let token = null;

function setToken(newToken) {
  token = newToken;
}

export function request({
  path,
  method = 'GET',
  headers = {},
  body,
  qs,
  skipAuth = false,
}) {
  if (token === null && !skipAuth) {
    throw new Error('no_api_token');
  }

  let url = constants.apiUrl + path;

  if (qs) {
    url += '?' + querystring.stringify(qs);
  }

  const opts = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'App-Token': constants.apiToken,
      Authorization: 'Bearer ' + token,
      ...headers,
    },
  };

  if (body) {
    opts.body = JSON.stringify(body);
  }

  return fetch(url, opts).then(async res => {
    const json = await res.json();

    if (!res.ok) {
      throw new NgApiError(json);
    }

    return json;
  });
}

export NgApiError from './NgApiError';

export default {
  setToken,
  users,
  misc,
  venues,
};
