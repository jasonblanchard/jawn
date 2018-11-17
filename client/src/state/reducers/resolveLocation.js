export default function(state, action) {
  switch (action.type) {
    case 'RESOLVE_LOCATION':
      return { ...state, ...{ routeId: action.routeId, params: action.params } };
    default:
      return state;
  }
}
