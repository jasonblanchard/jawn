export default {
  parseAuthorizationHeader: header => header.match(/Bearer (.*)/)[1],
};
