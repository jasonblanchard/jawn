import effects from '../index.js';

describe('changeLocation', () => {
  it('changes history with path argument', () => {
    const context = {
      coeffects: {
        registry: {
          history: {
            push: jest.fn(),
          },
        },
      },
    };

    const args = {
      path: '/next',
    };

    effects.changeLocation(context, args);

    expect(context.coeffects.registry.history.push).toBeCalledWith('/next');
  });

  it('changes history with nextPath coeffect', () => {
    const context = {
      coeffects: {
        nextPath: '/next',
        registry: {
          history: {
            push: jest.fn(),
          },
        },
      },
    };

    effects.changeLocation(context);

    expect(context.coeffects.registry.history.push).toBeCalledWith('/next');
  });
});
