import merge from 'lodash.merge';

// TODO: Consider moving this to combnineReducers so it's not global.
export default function(state, action) {
  switch (action.type) {
    case 'REQUEST_DELETE_ENTRY':
      return merge({}, state, {
        ephemeral: {
          didRequestDelete: true,
        },
      });
    case 'CANCEL_REQUEST_DELETE_ENTRY':
      return merge({}, state, {
        ephemeral: {
          didRequestDelete: false,
        },
      });
    case 'DELETE_ENTRY':
      return merge({}, state, {
        ephemeral: {
          deletingEntryId: action.id,
        },
      });
    case 'DELETE_ENTRY_COMPLETE':
      return merge({}, state, {
        ephemeral: {
          deletingEntryId: undefined,
        },
      });
    case 'LOAD_WORKSPACE_PAGE_COMPLETE':
      return merge({}, state, {
        ephemeral: {
          selectedEntryId: state.params.entryId,
        },
      });
    default:
      return state;
  }
}
