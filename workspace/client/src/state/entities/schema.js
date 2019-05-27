import { schema } from 'normalizr';

const user = new schema.Entity('users');
const entry = new schema.Entity('entries');

export default {
  entries: [entry],
  entry,
  user,
};
