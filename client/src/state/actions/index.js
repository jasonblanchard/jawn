import { frame } from 'redux-frame';

export default {
  resolveLocation: () => {
    return {
      type: frame('RESOLVE_LOCATION'),
      interceptors: [
        ['effect', { effectId: 'debug' }],
        ['injectCoeffects', { coeffectId: 'registry' }],
        ['injectCoeffects', { coeffectId: 'location' }],
        'locationToRouteId',
        ['injectCoeffects', { coeffectId: 'params' }],
        ['path', { from: 'routeId', to: 'action.routeId' }],
        ['path', { from: 'params', to: 'action.params' }],
        ['effect', { effectId: 'dispatch' }],
        ['effect', { effectId: 'dispatchPageOnEnter' }],
      ],
    };
  },
};
