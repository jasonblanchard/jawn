export default {
  parseAuthorizationHeader: header => (header ? header.match(/Bearer (.*)/)[1] : undefined),
};
