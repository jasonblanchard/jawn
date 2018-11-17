export default function(state, action) {
  switch (action.type) {
    case 'LOAD_WORKSPACE_PAGE_COMPLETE':
    case 'LOAD_SETTINGS_PAGE_COMPLETE':
      const { entities, entityIds } = action;
      return { ...state, ...{ entities, entityIds } };
    case 'UPDATE_ENTRY_COMPLETE':
      // TODO: Deep merge
      const { entities: entries } = action;
      const updatedEntries = { ...state.entities.entries, ...entries.entries };
      const updatedEntities = { ...state.entities, ...{ entries: updatedEntries } };
      return { ...state, ...{ entities: updatedEntities } };
    default:
      return state;
  }
}
