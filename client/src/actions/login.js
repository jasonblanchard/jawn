import http from 'superagent';

import {
  LOGIN_COMPLETED,
  LOGIN_FAILED,
  LOGIN_STARTED,
} from 'src/actions/types';

const LOG_TAG = 'login';

export default function(username, password) {
  return (dispatch, getState, registry) => {
    const { logger } = registry;

    dispatch({ type: LOGIN_STARTED });

    try {
      return http.post('/api/login')
        .send({ username, password })
        .then(httpResponse => {
          const currentUser = httpResponse.body;
          logger.debug({ currentUser }, LOG_TAG);

          // TODO: Only do this in dev? Merge with current state?
          localStorage.setItem('appState', JSON.stringify({ currentUser }));

          dispatch({ type: LOGIN_COMPLETED, currentUser });
        })
        .catch(error => {
          logger.debug(error, LOG_TAG);
          dispatch({ type: LOGIN_FAILED, error });
        });
    } catch (error) {
      logger.debug(error, LOG_TAG);
      dispatch({ type: LOGIN_FAILED, error });
    }
  };
}
