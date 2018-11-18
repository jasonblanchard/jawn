import Cookies from 'js-cookie';
import decode from 'jwt-decode';

export function getAccessToken() {
  return Cookies.get('token');
}

export function decodeUserId(token) {
  const decoded = decode(token);
  return decoded ? decoded.id : undefined;
}

export default {
  decodeUserId,
  getAccessToken,
};
