import merge from 'lodash.merge';

import {
  CREATE_ENTRY_STARTED,
  CREATE_ENTRY_COMPLETED
} from 'src/actions/types';

export default function(state, action) {
  switch (action.type) {
    case CREATE_ENTRY_STARTED:
      break;

      case CREATE_ENTRY_COMPLETED:
        state = Object.assign({}, state, { entities: merge({}, state.entities, action.entities) }, {entryIds: [...state.entryIds, action.entryId] });
        break;

      default:
        break;
  }

  return state;
}
