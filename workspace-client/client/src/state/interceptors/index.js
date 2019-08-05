import { normalize } from 'normalizr';
import { mergeWithCoeffects } from 'redux-frame';

import routes from 'config/routes';
import schemas from 'state/entities/schema';

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
        const { entities, result } = normalize(data[key], schema);
        // TODO: Deep merge?
        return { entities: { ...allEntities.entities, ...entities }, results: { ...allEntities.results, ...{ [key]: result } } };
      }, { entities: {}, results: {} });
      return mergeWithCoeffects(context, { normalizedBody });
    },
  },

  graphqalVariables: variables => {
    return {
      id: 'graphqalVariables',
      before: context => mergeWithCoeffects(context, { graphqalVariables: variables }),
    };
  },

  action: variables => {
    return {
      id: 'action',
      before: context => mergeWithCoeffects(context, { action: variables.action }),
    };
  },

  createdEntryPath: {
    id: 'createdEntryPath',
    before: context => {
      const id = context.coeffects.action.entityIds.entry;
      const nextPath = `/workspace/${id}`;
      return mergeWithCoeffects(context, { nextPath });
    },
  },
};
