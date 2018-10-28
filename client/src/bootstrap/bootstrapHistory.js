import createHistory from 'history/createBrowserHistory';
import { frame } from 'redux-frame';

export default function(registry) {
  const { store } = registry;
  const history = createHistory();

  history.listen(() => {
    store.dispatch({
      type: frame('RESOLVE_LOCATION'),
      interceptors: [
        ['effect', { effectId: 'debug' }],
        ['injectCoeffects', { coeffectId: 'registry' }],
        ['injectCoeffects', { coeffectId: 'location' }],
        'locationToRouteId',
        ['path', { from: 'routeId', to: 'action.routeId' }],
        ['effect', { effectId: 'dispatch' }],
      ],
    });
  });

  return history;
}
