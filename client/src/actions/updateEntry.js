import { normalize } from 'normalizr';
import http from 'superagent';

import { entrySchema } from 'src/entities/schema';

import {
  UPDATE_ENTRY_STARTED,
  UPDATE_ENTRY_COMPLETED,
  UPDATE_ENTRY_FAILED
} from 'src/actions/types';

export default function(id, fields) {
  return function(dispatch) {
    dispatch({ type: UPDATE_ENTRY_STARTED, fields });
    return http.post(`/api/entries/${id}`)
      .send(fields)
      .then(response => {
        const entry = response.body;
        const { entities, result: entryId } = normalize(entry, entrySchema);
        dispatch({ type: UPDATE_ENTRY_COMPLETED, entities, entryId });
      })
      .catch(error => {
        dispatch({ type: UPDATE_ENTRY_FAILED, error });
      });
    }
}
