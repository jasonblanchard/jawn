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

    return new Promise((resolve, reject) => {
      // Move to AuthenticationService and pass in NODE_ENV.
      return authenticationService.login(username, password)
        .then(currentUser => {
          dispatch({ type: LOGIN_COMPLETED, currentUser });
          return resolve();
        })
        .catch(error => {
          logger.debug(error, LOG_TAG);
          dispatch({ type: LOGIN_FAILED, error });
          return reject();
        });
    });
  };
}
