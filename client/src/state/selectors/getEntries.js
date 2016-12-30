import { arrayOf } from 'normalizr';
import { createSelector } from 'reselect';
import { denormalize } from 'denormalizr';

import { entrySchema } from 'src/entities/schema';

export default createSelector(
  state => state.entryIds,
  state => state.entities,
  (entryIds, entities) => denormalize(entryIds, entities, arrayOf(entrySchema))
)
