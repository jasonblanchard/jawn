import Immutable from 'immutable';

import {
  UPDATE_ENTRY_STARTED,
  UPDATE_ENTRY_COMPLETED,
} from 'src/actions/types';

export default function(state, action) {
  switch (action.type) {
    case UPDATE_ENTRY_STARTED:
      break;

    case UPDATE_ENTRY_COMPLETED:
      state = state.update('entities', entities => entities.mergeDeep(Immutable.fromJS(action.entities)));
      break;

    default:
      break;
  }

  return state;
}
