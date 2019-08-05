import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import get from 'lodash.get';

import TokenUtils from 'utils/TokenUtils';

import schema from 'state/entities/schema';

const getEntries = createSelector(
  state => (state.entityIds ? state.entityIds.entries : []),
  state => state.entities,
  (entryIds, entities) => {
    if (!entryIds || !entities) return [];
    return denormalize(entryIds, schema.entries, entities)
      // TODO: Better date sorting
      .sort((first, second) => {
        if (first === second) return 0;
        return first > second ? 1 : -1;
      }) || [];
  },
);

const getSelectedEntryId = state => get(state, 'ephemeral.selectedEntryId');

const getSelectedEntry = createSelector(
  state => getSelectedEntryId(state),
  state => state.entities,
  (entryId, entities) => {
    if (!entities) return undefined;
    return denormalize(entryId, schema.entry, entities);
  },
);

const deletingEntryId = state => get(state, 'ephemeral.deletingEntryId');

export default {
  getEntries,

  getRouteId: state => state.routeId,

  didLoginStart: state => Boolean(state.loginStarted),

  didLoginFail: state => Boolean(state.loginFailed),

  getEntryPreviews: createSelector(
    state => getEntries(state),
    entries => {
      if (!entries) return [];
      return entries.map(entry => ({
        id: entry.id,
        text: entry.text.split('\n')[0] || '(untitled)',
      }));
    },
  ),

  getSelectedEntry,

  getEntryFormInitialValues: createSelector(
    state => getSelectedEntry(state),
    entry => {
      if (!entry) return { text: '' };
      const { text } = entry;
      return { text };
    },
  ),

  isEntryFormIsSaving: state => state.isEntryFormIsSaving,

  getSelectedEntryId,

  didRequestDelete: state => get(state, 'ephemeral.didRequestDelete', false),

  deletingEntryId,

  isDeletingSelectedEntry: createSelector(
    state => getSelectedEntryId(state),
    state => deletingEntryId(state),
    (selectedEntryId, currentDeletingEntryId) => {
      if (!selectedEntryId) return false;
      return selectedEntryId === currentDeletingEntryId;
    },
  ),
};
