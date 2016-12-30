import { normalize, arrayOf } from 'normalizr';
import http from 'superagent';

import { entrySchema } from 'src/entities/schema';

import {
  FETCH_ENTRIES_STARTED,
  FETCH_ENTRIES_COMPLETED,
  FETCH_ENTRIES_FAILED
} from 'src/actions/types';

export default function() {
  return function(dispatch) {
    dispatch({ type: FETCH_ENTRIES_STARTED });
    return http.get('/api/entries')
      .then(response => {
        const entries = response.body;
        const { entities, result: entryIds } = normalize(entries, arrayOf(entrySchema));
        dispatch({ type: FETCH_ENTRIES_COMPLETED, entities, entryIds });
      })
      .catch(error => {
        dispatch({ type: FETCH_ENTRIES_FAILED, error });
      });
  }
}
