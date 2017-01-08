import { normalize } from 'normalizr';
import http from 'superagent';

import { entrySchema } from 'src/entities/schema';
import selectors from 'src/state/selectors';

import {
  UPDATE_ENTRY_STARTED,
  UPDATE_ENTRY_COMPLETED,
  UPDATE_ENTRY_FAILED,
} from 'src/actions/types';

const LOG_TAG = 'updateEntry';

export default function(id, fields) {
  return (dispatch, getState, registry) => {
    const { logger } = registry;

    dispatch({ type: UPDATE_ENTRY_STARTED, fields });

    try {
      const token = selectors.getCurrentUser(getState()).token;

      return http.post(`/api/entries/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(fields)
        .then(response => {
          const entry = response.body;
          logger.debug({ entry }, LOG_TAG);

          const { entities } = normalize(entry, entrySchema);
          logger.debug({ entities }, LOG_TAG);

          dispatch({ type: UPDATE_ENTRY_COMPLETED, entities });
        })
        .catch(error => {
          logger.debug(error, LOG_TAG);
          dispatch({ type: UPDATE_ENTRY_FAILED, error });
        });
    } catch (error) {
      logger.debug(error, LOG_TAG);
      dispatch({ type: UPDATE_ENTRY_FAILED, error });
    }
  };
}
