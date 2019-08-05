import { schema } from 'normalizr';

const entry = new schema.Entity('entries');

export default {
  entries: [entry],
  entry,
};
