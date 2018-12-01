import ephemeral from '../ephemeral';

describe('ephemeral', () => {
  it('REQUEST_DELETE_ENTRY sets state', () => {
    const state = ephemeral({}, { type: 'REQUEST_DELETE_ENTRY' });
    expect(state).toEqual({
      ephemeral: {
        didRequestDelete: true,
      },
    });
  });
});
