import { getToken } from './api';
const authTokenKey = 'auth_token';

const parseQueryParams = query => {
  if (!query) {
    return { };
  }

  return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split('&')
    .reduce((params, param) => {
      let [ key, value ] = param.split('=');
      params[key] = value
        ? decodeURIComponent(value.replace(/\+/g, ' '))
        : '';

      return params;
    }, { });
};

const decodeToken = token => JSON.parse(atob(token.split('.')[1]));
const stripTokenInfo = ({ email, displayName }) => ({ email, displayName });

export const checkAuth = () => {
  const { authcode } = parseQueryParams(window.location.search);

  if (authcode) {
    window.history.replaceState(null, null, window.location.pathname);

    return getToken(authcode)
      .then((response) => {
        localStorage.setItem(authTokenKey, response.auth_token);

        return stripTokenInfo(decodeToken(response.auth_token))
      });
  }

  return new Promise((resolve, reject) => {
    const tokenFromLocalStorage = localStorage.getItem(authTokenKey);

    if (tokenFromLocalStorage) {
      return resolve(stripTokenInfo(decodeToken(tokenFromLocalStorage)));
    }

    return reject('no token found');
  });

}
