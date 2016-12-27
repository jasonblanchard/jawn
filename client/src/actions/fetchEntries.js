import http from 'superagent';

import {
  LOAD_ENTRIES_INDEX_PAGE_STARTED,
  LOAD_ENTRIES_INDEX_PAGE_COMPLETED,
  LOAD_ENTRIES_INDEX_PAGE_FAILED
} from 'src/actions/types';

export default function(dispatch) {
  dispatch({ type: LOAD_ENTRIES_INDEX_PAGE_STARTED });
  return http.get('/api/entries')
    .then(response => {
      const entries = response.body;
      dispatch({ type: LOAD_ENTRIES_INDEX_PAGE_COMPLETED, entries });
    })
    .catch(error => {
      dispatch({ type: LOAD_ENTRIES_INDEX_PAGE_FAILED, error });
    });
}
