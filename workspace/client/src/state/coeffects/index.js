import TokenUtils from 'utils/TokenUtils';

import routes from 'config/routes';

export default {
  location: context => {
    const { coeffects: { registry } } = context;
    return registry.history.location;
  },

  params: context => {
    const route = routes[context.coeffects.routeId];
    return route && route.params ? route.params(context.coeffects.location.pathname) : {};
  },

  accessToken: () => {
    return TokenUtils.getAccessToken();
  },

  currentUserId: () => {
    const accessToken = TokenUtils.getAccessToken();
    if (!accessToken) return undefined;
    return TokenUtils.decodeUserId(accessToken);
  },
};
