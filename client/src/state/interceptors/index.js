import { mergeWithCoeffects } from 'redux-frame';

import routes from 'config/routes';

export default {
  locationToRouteId: {
    id: 'locationToRouteId',
    before: context => {
      const { coeffects: { location } } = context;
      const routeId = Object.keys(routes).find(key => routes[key].matches(location.pathname));
      return mergeWithCoeffects(context, { routeId });
    },
  },
};
