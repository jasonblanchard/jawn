import Immutable from 'immutable';

import {
  LOGIN_STARTED,
  LOGIN_COMPLETED,
} from 'src/actions/types';

export default function(state, action) {
  switch (action.type) {
    case LOGIN_STARTED:
      break;

    case LOGIN_COMPLETED:
      state = state.set('currentUser', Immutable.fromJS(action.currentUser));
      break;

    default:
      break;
  }

  return state;
}
