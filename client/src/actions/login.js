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
        const currentUser = httpResponse.body;
        // TODO: Only do this in dev? Merge with current state?
        localStorage.setItem('appState', JSON.stringify({ currentUser }));
        dispatch({ type: LOGIN_COMPLETED, currentUser });
      })
      .catch(error => {
        dispatch({ type: LOGIN_FAILED, error });
        throw new Error();
      });
  };
}
