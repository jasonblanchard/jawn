import http from 'superagent';

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
        dispatch({ type: FETCH_ENTRIES_COMPLETED, entries });
      })
      .catch(error => {
        dispatch({ type: FETCH_ENTRIES_FAILED, error });
      });
  }
}
