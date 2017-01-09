import {
  LOGIN_COMPLETED,
  LOGIN_FAILED,
  LOGIN_STARTED,
} from 'src/actions/types';

const LOG_TAG = 'login';

export default function(username, password) {
  return (dispatch, getState, registry) => {
    const { logger, authenticationService } = registry;

    dispatch({ type: LOGIN_STARTED });

    try {
      // Move to AuthenticationService and pass in NODE_ENV.
      return authenticationService.login(username, password)
        .then(currentUser => {
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
