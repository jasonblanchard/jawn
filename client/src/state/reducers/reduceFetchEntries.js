import {
  FETCH_ENTRIES_STARTED,
  FETCH_ENTRIES_COMPLETED
} from 'src/actions/types';

export default function(state, action) {
  switch (action.type) {
    case FETCH_ENTRIES_STARTED:
      break;

      case FETCH_ENTRIES_COMPLETED:
        state = Object.assign({}, state, { entries: action.entries });
        break;

      default:
        break;
  }

  return state;
}
