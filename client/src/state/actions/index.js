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
        ['path', { from: 'routeId', to: 'action.routeId' }],
        ['effect', { effectId: 'dispatch' }],
        ['effect', { effectId: 'dispatchPageOnEnter' }],
      ],
    };
  },
};
