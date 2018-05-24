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

export const checkAuthCode = () => {
  const tokenFromLocalStorage = localStorage.getItem(authTokenKey);
  console.log(tokenFromLocalStorage);

  const { authcode } = parseQueryParams(window.location.search);

  if (authcode) {
    window.history.replaceState(null, null, window.location.pathname);
    console.log('authcode', authcode);

    getToken(authcode).then(response => localStorage.setItem(authTokenKey, response.auth_token));
  }
}
