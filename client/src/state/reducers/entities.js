export default function(state, action) {
  switch (action.type) {
    case 'LOAD_WORKSPACE_PAGE_COMPLETE':
      const { entities } = action;
      return { ...state, ...{ entities } };
    default:
      return state;
  }
}
