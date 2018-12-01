import selectors from '../index';

describe('getSelectedEntryId', () => {
  it('returns the value', () => {
    const state = {
      ephemeral: {
        selectedEntryId: 123,
      },
    };

    expect(selectors.getSelectedEntryId(state)).toEqual(123);
  });
});
