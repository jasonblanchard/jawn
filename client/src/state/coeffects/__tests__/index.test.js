import coeffects from '../index';

describe('location', () => {
  it('returns the location', () => {
    const context = {
      coeffects: {
        registry: {
          history: {
            location: {
              pathname: '/test/location',
            },
          },
        },
      },
    };

    expect(coeffects.location(context)).toEqual({ pathname: '/test/location' });
  });
});
