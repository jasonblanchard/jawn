import http from 'superagent';
import routes from 'config/routes';

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

  dispatchPageOnEnter: (context, args, dispatch) => {
    const { coeffects: { routeId } } = context;
    const route = routes[routeId];
    if (route && route.onEnterAction) dispatch(route.onEnterAction);
  },
};
