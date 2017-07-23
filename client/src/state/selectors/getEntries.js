import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';

import { entryListSchema } from 'src/entities/schema';

export default createSelector(
  state => state.get('entryIds'),
  state => state.get('entities'),
  (entryIds, entities) => entryIds && denormalize(entryIds, entryListSchema, entities).toJS(),
);
