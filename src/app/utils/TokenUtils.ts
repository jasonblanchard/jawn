export default {
  parseAuthorizationHeader: (header: string | undefined) => {
    if (!header) return undefined;
    const match = header.match(/Bearer (.*)/);
    if (match) return match[1];
    return undefined;
  },
};
