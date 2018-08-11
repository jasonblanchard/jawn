import routes from 'config/routes';

export default function(state, action) {
  switch (action.type) {
    case 'RESOLVE_LOCATION':
      const routeId = Object.keys(routes).find(key => routes[key].matches(action.location.pathname));

      return { ...state, ...{ routeId } };
    default:
      return state;
  }
}
