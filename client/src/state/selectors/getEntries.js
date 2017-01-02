import { arrayOf } from 'normalizr';
import { createSelector } from 'reselect';
import { denormalize } from 'denormalizr';

import { entrySchema } from 'src/entities/schema';

export default createSelector(
  state => state.app.get('entryIds'),
  state => state.app.get('entities'),
  (entryIds, entities) => entryIds && denormalize(entryIds, entities, arrayOf(entrySchema)).toJS()
)
