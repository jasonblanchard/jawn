import {
  LOAD_ENTRIES_INDEX_PAGE_STARTED,
  LOAD_ENTRIES_INDEX_PAGE_COMPLETED
} from 'src/actions/types';

export default function(state, action) {
  switch (action.type) {
    case LOAD_ENTRIES_INDEX_PAGE_STARTED:
      break;

      case LOAD_ENTRIES_INDEX_PAGE_COMPLETED:
        state = Object.assign({}, state, { entries: action.entries });
        break;

      default:
        break;
  }

  return state;
}
