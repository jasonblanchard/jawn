import {
  DELETE_ENTRY_STARTED,
  DELETE_ENTRY_COMPLETED,
} from 'src/actions/types';

export default function(state, action) {
  switch (action.type) {
    case DELETE_ENTRY_STARTED:
      break;

    case DELETE_ENTRY_COMPLETED:
      state = state.update('entryIds', entryIds => {
        const index = entryIds.findIndex(entryId => entryId === action.id);
        return entryIds.remove(index);
      });
      break;

    default:
      break;
  }

  return state;
}
