import Immutable from 'immutable';

import {
  CREATE_ENTRY_STARTED,
  CREATE_ENTRY_COMPLETED,
} from 'src/actions/types';

export default function(state, action) {
  switch (action.type) {
    case CREATE_ENTRY_STARTED:
      state = state.set('isEntryCreating', true);
      break;

    case CREATE_ENTRY_COMPLETED:
      state = state.delete('isEntryCreating');
      state = state.update('entities', Immutable.Map(), entities => entities.mergeDeep(Immutable.fromJS(action.entities)));
      state = state.update('entryIds', Immutable.List(), entryIds => entryIds.push(action.entryId));
      break;

    default:
      break;
  }

  return state;
}
