import http from 'superagent';

import selectors from 'src/state/selectors';

import {
  DELETE_ENTRY_STARTED,
  DELETE_ENTRY_COMPLETED,
  DELETE_ENTRY_FAILED,
} from 'src/actions/types';

const LOG_TAG = 'deleteEntry';

export default function(id) {
  return (dispatch, getState, registry) => {
    const { logger } = registry;

    dispatch({ type: DELETE_ENTRY_STARTED, id });

    return new Promise((resolve, reject) => {
      const token = selectors.getCurrentUser(getState()).token;

      return http.delete(`/api/entries/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .then(response => {
          logger.debug({ status: response.status }, LOG_TAG);
          dispatch({ type: DELETE_ENTRY_COMPLETED, id });
          return resolve();
        })
        .catch(error => {
          logger.debug(error, LOG_TAG);
          dispatch({ type: DELETE_ENTRY_FAILED, error });
          return reject();
        });
    });
  };
}
