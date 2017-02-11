import { arrayOf } from 'normalizr';
import { createSelector } from 'reselect';
import { denormalize } from 'denormalizr';

import { entrySchema } from 'src/entities/schema';

export default createSelector(
  state => state.get('entryIds'),
  state => state.get('entities'),
  (entryIds, entities) => entryIds && denormalize(entryIds, entities, arrayOf(entrySchema)).toJS(),
);
