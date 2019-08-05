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

describe('getRouteId', () => {
  it('returns the routeId', () => {
    const state = {
      routeId: 'home',
    };

    expect(selectors.getRouteId(state)).toEqual('home');
  });
});

describe('didLoginStart', () => {
  it('returns didLoginStart', () => {
    const state = {
      loginStarted: true,
    };

    expect(selectors.didLoginStart(state)).toEqual(true);
  });
});

describe('didLoginFail', () => {
  it('returns didLoginFail', () => {
    const state = {
      loginFailed: true,
    };

    expect(selectors.didLoginFail(state)).toEqual(true);
  });
});

describe('getEntries', () => {
  it('denormalized entities', () => {
    const state = {
      entityIds: {
        entries: [1, 2],
      },
      entities: {
        entries: {
          1: {
            id: '1',
            text: 'asdfasdf',
            timeCreated: '2018-01-10T21:39:20-05:00',
            timeUpdated: null,
          },
          2: {
            id: '2',
            text: 'asdfasdf',
            timeCreated: '2018-01-10T21:39:20-05:00',
            timeUpdated: null,
          },
        },
      },
    };

    expect(selectors.getEntries(state)).toEqual([
      {
        id: '1',
        text: 'asdfasdf',
        timeCreated: '2018-01-10T21:39:20-05:00',
        timeUpdated: null,
      },
      {
        id: '2',
        text: 'asdfasdf',
        timeCreated: '2018-01-10T21:39:20-05:00',
        timeUpdated: null,
      },
    ]);
  });
});

describe('getEntryPreviews', () => {
  it('returns the previews', () => {
    const state = {
      entityIds: {
        entries: [1, 2],
      },
      entities: {
        entries: {
          1: {
            id: '1',
            text: 'first\nasdfsdf',
            timeCreated: '2018-01-10T21:39:20-05:00',
            timeUpdated: null,
          },
          2: {
            id: '2',
            text: 'second\nsdf asdf asdf',
            timeCreated: '2018-01-10T21:39:20-05:00',
            timeUpdated: null,
          },
        },
      },
    };

    expect(selectors.getEntryPreviews(state)).toEqual([
      {
        id: '1',
        text: 'first',
      },
      {
        id: '2',
        text: 'second',
      },
    ]);
  });
});

describe('getSelectedEntry', () => {
  it('returns the selected entry', () => {
    const state = {
      ephemeral: {
        selectedEntryId: '1',
      },
      entities: {
        entries: {
          1: {
            id: '1',
            text: 'first\nasdfsdf',
            timeCreated: '2018-01-10T21:39:20-05:00',
            timeUpdated: null,
          },
          2: {
            id: '2',
            text: 'second\nsdf asdf asdf',
            timeCreated: '2018-01-10T21:39:20-05:00',
            timeUpdated: null,
          },
        },
      },
    };

    expect(selectors.getSelectedEntry(state)).toEqual({
      id: '1',
      text: 'first\nasdfsdf',
      timeCreated: '2018-01-10T21:39:20-05:00',
      timeUpdated: null,
    });
  });
});

describe('didRequestDelete', () => {
  it('returns didRequestDelete', () => {
    const state = {
      ephemeral: {
        didRequestDelete: true,
      },
    };

    expect(selectors.didRequestDelete(state)).toEqual(true);
  });
});

describe('deletingEntryId', () => {
  it('returns deletingEntryId', () => {
    const state = {
      ephemeral: {
        deletingEntryId: '123',
      },
    };

    expect(selectors.deletingEntryId(state)).toEqual('123');
  });
});

describe('isDeletingSelectedEntry', () => {
  it('returns true if the selected entry id matches the deleting entry id', () => {
    const state = {
      ephemeral: {
        selectedEntryId: '1',
        deletingEntryId: '1',
      },
    };

    expect(selectors.isDeletingSelectedEntry(state)).toEqual(true);
  });

  it('returns flase if the selected entry id does not match the deleting entry id', () => {
    const state = {
      ephemeral: {
        selectedEntryId: '1',
        deletingEntryId: '2',
      },
    };

    expect(selectors.isDeletingSelectedEntry(state)).toEqual(false);
  });
});

describe('getEntryFormInitialValues', () => {
  it('returns the initial form values when there is a selected entry', () => {
    const state = {
      ephemeral: {
        selectedEntryId: '1',
      },
      entities: {
        entries: {
          1: {
            id: '1',
            text: 'first\nasdfsdf',
            timeCreated: '2018-01-10T21:39:20-05:00',
            timeUpdated: null,
          },
          2: {
            id: '2',
            text: 'second\nsdf asdf asdf',
            timeCreated: '2018-01-10T21:39:20-05:00',
            timeUpdated: null,
          },
        },
      },
    };

    expect(selectors.getEntryFormInitialValues(state)).toEqual({
      text: 'first\nasdfsdf',
    });
  });

  it('returns the initial form values when there is not a selected entry', () => {
    const state = {};

    expect(selectors.getEntryFormInitialValues(state)).toEqual({
      text: '',
    });
  });
});

describe('isEntryFormIsSaving', () => {
  it('returns isEntryFormIsSaving', () => {
    const state = {
      isEntryFormIsSaving: true,
    };

    expect(selectors.isEntryFormIsSaving(state)).toEqual(true);
  });
});
