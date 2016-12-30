import http from 'superagent';

import {
  CREATE_ENTRY_STARTED,
  CREATE_ENTRY_COMPLETED,
  CREATE_ENTRY_FAILED
} from 'src/actions/types';

export default function(text) {
  return function(dispatch) {
    dispatch({ type: CREATE_ENTRY_STARTED, text });
    return http.post('/api/entries')
      .send({ text })
      .then(response => {
        const entry = response.body;
        dispatch({ type: CREATE_ENTRY_COMPLETED, entry });
      })
      .catch(error => {
        dispatch({ type: CREATE_ENTRY_FAILED, error });
      });
    }
}
