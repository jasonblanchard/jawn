import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';

import schema from 'state/entities/schema';

export default {
  getEntries: createSelector(
    state => (state.entityIds ? state.entityIds.entries : []),
    state => state.entities,
    (entryIds, entities) => {
      if (!entities) return [];
      return denormalize(entryIds, schema.entries, entities);
    },
  ),
};
