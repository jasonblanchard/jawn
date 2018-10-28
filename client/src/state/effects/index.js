import http from 'superagent';

export default {
  changeLocation: (context, args) => {
    const { coeffects: { registry } } = context;
    const { method, path } = args;
    registry.history[method || 'push'](path);
  },
  http: (context, args, dispatch) => {
    const { method, path, body, onSuccessAction, onFailureAction } = args;
    http[method](path).send(body)
      .then(response => {
        const { body: responseBody, status, headers } = response;
        dispatch({ ...onSuccessAction, ...{ body: responseBody, status, headers } });
      })
      .catch(error => {
        const { body: responseBody, status, headers } = error.response;
        dispatch({ ...onFailureAction, ...{ body: responseBody, status, headers } });
      });
  },
};
