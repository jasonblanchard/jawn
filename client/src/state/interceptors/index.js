import { normalize } from 'normalizr';
import { mergeWithCoeffects } from 'redux-frame';

import routes from 'config/routes';
import schemas from 'src/state/entities/schema';

export default {
  locationToRouteId: {
    id: 'locationToRouteId',
    before: context => {
      const { coeffects: { location } } = context;
      const routeId = Object.keys(routes).find(key => routes[key].matches(location.pathname));
      return mergeWithCoeffects(context, { routeId });
    },
  },

  normalizeBody: {
    id: 'normalize',
    before: context => {
      const { coeffects: { action } } = context;
      const { body: { data } } = action;
      const normalizedBody = Object.keys(data).reduce((allEntities, key) => {
        const schema = schemas[key];
        // TODO: Return results, too?
        const { entities } = normalize(data[key], schema);
        // TODO: Deep merge?
        return { ...allEntities, ...entities };
      }, {});
      return mergeWithCoeffects(context, { normalizedBody });
    },
  },
};
