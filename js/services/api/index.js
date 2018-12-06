import constants from '../../config/constants';

let token = null;

function setToken(newToken) {
  token = newToken;
}

function login(email, password) {
  return request({
    path: '/users/login',
    method: 'POST',
    body: {
      email,
      password,
    },
  });
}

function request({ path, method = 'GET', headers = {}, body }) {
  if (token === null && path !== '/users/login') {
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
      throw json;
    }

    return json;
  });
}

export default {
  setToken,
  users: {
    login,
  },
};
