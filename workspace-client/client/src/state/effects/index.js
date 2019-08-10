import debounce from 'lodash.debounce';
import http from 'superagent';

import actions from 'state/actions';
import routes from 'config/routes';

const debouncedUpdateEntry = debounce((dispatch, id, input) => dispatch(actions.udpateEntry(id, input)), 1000, { maxWait: 2000 });

export default {
  changeLocation: (context, args = {}) => {
    const { coeffects: { registry, nextPath } } = context;
    const { method, path } = args;
    registry.history[method || 'push'](path || nextPath);
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
    // TODO: Pass this in via env
    http.post('/api/workspace/graphql/')
      // .set('Authorization', `Bearer ${context.coeffects.accessToken}`)
      .set('CSRF-Token', window.ENV.CSRF_TOKEN) // TODO: Inject this
      .send({ query, variables })
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
    const { values, id } = context.coeffects.action;
    debouncedUpdateEntry(dispatch, id, values);
  },

  scrollToTop: () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  },
};
