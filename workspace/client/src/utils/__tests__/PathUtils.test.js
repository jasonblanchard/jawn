import PathUtils from 'utils/PathUtils';

describe('PathUtils', () => {
  describe('matches', () => {
    it('returns true for a match with a param', () => {
      const result = PathUtils.matches('/workspace/:workspaceId', '/workspace/123');
      expect(result).toEqual(true);
    });

    it('returns true for a match without an optional param', () => {
      const result = PathUtils.matches('/workspace/:workspaceId?', '/workspace');
      expect(result).toEqual(true);
    });

    it('returns false for not a match', () => {
      const result = PathUtils.matches('/workspace/:workspaceId', '/sdf');
      expect(result).toEqual(false);
    });
  });

  describe('params', () => {
    it('returns params for a route with params', () => {
      const params = PathUtils.params('/workspace/:workspaceId/something/:somethingId', '/workspace/123/something/567');
      expect(params).toEqual({ workspaceId: '123', somethingId: '567' });
    });

    it('returns empty object for paths with optional params', () => {
      const params = PathUtils.params('/workspace/:workspaceId?', '/workspace');
      expect(params).toEqual({});
    });

    it('returns empty object for paths without params', () => {
      const params = PathUtils.params('/workspace', '/workspace');
      expect(params).toEqual({});
    });
  });
});
