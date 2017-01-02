import http from 'superagent';

import {
  LOGIN_COMPLETED,
  LOGIN_FAILED,
  LOGIN_STARTED,
} from 'src/actions/types';

export default function(username, password) {
  return dispatch => {
    dispatch({ type: LOGIN_STARTED });
    return http.post('/api/login')
      .send({ username, password })
      .then(httpResponse => {
        dispatch({ type: LOGIN_COMPLETED, user: httpResponse.body });
      })
      .catch(error => {
        dispatch({ type: LOGIN_FAILED, error });
        throw new Error();
      });
  };
}
