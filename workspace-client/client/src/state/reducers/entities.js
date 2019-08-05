import merge from 'lodash.merge';

export default function(state, action) {
  switch (action.type) {
    case 'LOAD_WORKSPACE_PAGE_COMPLETE':
    case 'LOAD_SETTINGS_PAGE_COMPLETE':
      const { entities, entityIds } = action;
      return { ...state, ...{ entities, entityIds } };
    case 'UPDATE_ENTRY_COMPLETE':
    case 'CREATE_ENTRY_COMPLETE':
      return { ...state, ...{ entities: merge({}, state.entities, action.entities) } };
    default:
      return state;
  }
}
