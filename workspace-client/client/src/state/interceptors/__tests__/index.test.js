import interceptors from '../index';

describe('createdEntryPath', () => {
  it('returns the path', () => {
    const context = {
      coeffects: {
        action: {
          entityIds: {
            entry: '123',
          },
        },
      },
    };

    expect(interceptors.createdEntryPath.before(context).coeffects.nextPath).toEqual('/workspace/123');
  });
});
