import http from 'superagent';

import {
  DELETE_ENTRY_STARTED,
  DELETE_ENTRY_COMPLETED,
  DELETE_ENTRY_FAILED
} from 'src/actions/types';

export default function(id) {
  return function(dispatch) {
    dispatch({ type: DELETE_ENTRY_STARTED, id });
    return http.delete(`/api/entries/${id}`)
      .then(() => {
        dispatch({ type: DELETE_ENTRY_COMPLETED, id });
      })
      .catch(error => {
        dispatch({ type: DELETE_ENTRY_FAILED, error });
      });
    }
}
