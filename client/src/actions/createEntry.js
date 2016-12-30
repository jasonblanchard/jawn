import { normalize } from 'normalizr';
import http from 'superagent';

import { entrySchema } from 'src/entities/schema';

import {
  CREATE_ENTRY_STARTED,
  CREATE_ENTRY_COMPLETED,
  CREATE_ENTRY_FAILED
} from 'src/actions/types';

export default function(fields) {
  return function(dispatch) {
    dispatch({ type: CREATE_ENTRY_STARTED, fields });
    return http.post('/api/entries')
      .send(fields)
      .then(response => {
        const entry = response.body;
        const { entities, result: entryId } = normalize(entry, entrySchema);
        dispatch({ type: CREATE_ENTRY_COMPLETED, entities, entryId });
      })
      .catch(error => {
        dispatch({ type: CREATE_ENTRY_FAILED, error });
      });
    }
}
