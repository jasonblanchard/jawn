import TokenUtils from 'src/utils/TokenUtils';

export default {
  location: context => {
    const { coeffects: { registry } } = context;
    return registry.history.location;
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
