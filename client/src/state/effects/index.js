import debounce from 'lodash.debounce';
import http from 'superagent';

import actions from 'state/actions';
import routes from 'config/routes';

// TODO: IMPORTANT: Scope this to a specific entry so it doesn't overwrite other ones.
const debouncedUpdateEntry = debounce((dispatch, input) => dispatch(actions.udpateEntry(input)), 1000, { maxWait: 2000 });

export default {
  changeLocation: (context, args) => {
    const { coeffects: { registry } } = context;
    const { method, path } = args;
    registry.history[method || 'push'](path);
  },

  http: (context, args, dispatch) => {
    const { method, path, body, onSuccessAction, onFailureAction } = args;
    http[method](path).set('Authorization', `Bearer ${context.coeffects.accessToken}`).send(body)
      .then(response => {
        const { body: responseBody, status, headers } = response;
        dispatch({ ...onSuccessAction, ...{ body: responseBody, status, headers } });
      })
      .catch(error => {
        console.error(error); // eslint-disable-line no-console
        dispatch({ ...onFailureAction, ...{ error: error.message, response: error.response } });
      });
  },

  graphql: (context, args, dispatch) => {
    const { query, onSuccessAction, onFailureAction } = args;
    const { coeffects: { graphqalVariables: variables } } = context;
    http.post('/api/graphql').set('Authorization', `Bearer ${context.coeffects.accessToken}`).send({ query, variables })
      .then(response => {
        const { body: responseBody, status, headers } = response;
        dispatch({ ...onSuccessAction, ...{ body: responseBody, status, headers } });
      })
      .catch(error => {
        console.error(error); // eslint-disable-line no-console
        dispatch({ ...onFailureAction, ...{ error: error.message, response: error.response } });
      });
  },

  dispatchPageOnEnter: (context, args, dispatch) => {
    const { coeffects: { routeId } } = context;
    const route = routes[routeId];
    if (route && route.onEnterAction) dispatch(route.onEnterAction);
  },

  debouncedUpdateEntry: (context, args, dispatch) => {
    const input = context.coeffects.action.values;
    debouncedUpdateEntry(dispatch, input);
  },
};
