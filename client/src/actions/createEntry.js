import { normalize } from 'normalizr';
import http from 'superagent';

import { entrySchema } from 'src/entities/schema';
import selectors from 'src/state/selectors';

import {
  CREATE_ENTRY_STARTED,
  CREATE_ENTRY_COMPLETED,
  CREATE_ENTRY_FAILED,
} from 'src/actions/types';

const LOG_TAG = 'createEntry';

export default function(fields) {
  return (dispatch, getState, registry) => {
    const { logger } = registry;

    dispatch({ type: CREATE_ENTRY_STARTED, fields });

    try {
      const token = selectors.getCurrentUser(getState()).token;

      return http.post('/api/entries')
        .set('Authorization', `Bearer ${token}`)
        .send(fields)
        .then(response => {
          const entry = response.body;
          const { entities, result: entryId } = normalize(entry, entrySchema);
          dispatch({ type: CREATE_ENTRY_COMPLETED, entities, entryId });
        })
        .catch(error => {
          logger.debug(error, LOG_TAG);
          dispatch({ type: CREATE_ENTRY_FAILED, error });
        });
    } catch (error) {
      logger.debug(error, LOG_TAG);
      dispatch({ type: CREATE_ENTRY_FAILED, error });
    }
  };
}
