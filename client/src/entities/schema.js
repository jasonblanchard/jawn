import { schema } from 'normalizr';

export const entrySchema = new schema.Entity('entries');
export const entryListSchema = new schema.Array(entrySchema);
