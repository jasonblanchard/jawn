import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import get from 'lodash.get';

import TokenUtils from 'utils/TokenUtils';

import schema from 'state/entities/schema';

const getEntries = createSelector(
  state => (state.entityIds ? state.entityIds.entries : []),
  state => state.entities,
  (entryIds, entities) => {
    if (!entities) return [];
    return denormalize(entryIds, schema.entries, entities)
      // TODO: Better date sorting
      .sort((first, second) => {
        if (first === second) return 0;
        return first > second ? 1 : -1;
      }) || [];
  },
);

const getSelectedEntry = createSelector(
  state => state.params.entryId,
  state => state.entities,
  (entryId, entities) => {
    if (!entities) return undefined;
    return denormalize(entryId, schema.entry, entities);
  },
);

const getSelectedEntryId = createSelector(
  state => getSelectedEntry(state),
  (entry) => {
    if (!entry) return undefined;
    return entry.id;
  },
);

const deletingEntryId = state => get(state, 'ephemeral.deletingEntryId');

export default {
  getEntries,

  getAuthenticatedUser: createSelector(
    state => state.entities,
    () => TokenUtils.getAccessToken(), // NOTE: This selector isn't pure since it's reaching into the access token cookie, but we really want that to be the source of truth to make sure it stops working when the cookie is destroyed.
    (entities, accessToken) => {
      if (!entities) return undefined;
      if (!accessToken) return undefined;
      const userId = TokenUtils.decodeUserId(accessToken);
      return denormalize(userId, schema.user, entities);
    },
  ),

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
    state => getSelectedEntry(state),
    state => deletingEntryId(state),
    (selectedEntry, currentDeletingEntryId) => {
      if (!selectedEntry) return false;
      return selectedEntry.id === currentDeletingEntryId;
    },
  ),
};
