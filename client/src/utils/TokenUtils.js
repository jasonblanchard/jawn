import Cookies from 'js-cookie';

export function getAccessToken() {
  return Cookies.get('token');
}

export default {
  getAccessToken,
};
