import Immutable from 'immutable';

import {
  UPDATE_ENTRY_COMPLETED,
  UPDATE_ENTRY_FAILED,
  UPDATE_ENTRY_STARTED,
} from 'src/actions/types';

export default function(state, action) {
  switch (action.type) {
    case UPDATE_ENTRY_STARTED:
      state = state.set('isEntryUpdating', true);
      state = state.set('updatingEntryId', action.id);
      break;

    case UPDATE_ENTRY_COMPLETED:
      state = state.delete('updatingEntryId');
      state = state.update('entities', entities => entities.mergeDeep(Immutable.fromJS(action.entities)));
      break;

    case UPDATE_ENTRY_FAILED:
      state = state.delete('updatingEntryId');
      break;

    default:
      break;
  }

  return state;
}
