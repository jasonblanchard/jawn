export default function(state, action) {
  switch (action.type) {
    case 'LOAD_WORKSPACE_PAGE_COMPLETE':
      const { entities, entityIds } = action;
      return { ...state, ...{ entities, entityIds } };
    default:
      return state;
  }
}
