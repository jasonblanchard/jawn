import { Schema } from 'mongoose';

const LOG_TAG = 'UserService';

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  timeCreated: String,
});

function mapRecordToObject(record) {
  if (!record) return null;

  return {
    id: record.id,
    username: record.username,
    email: record.email,
    timeCreated: record.timeCreated,
    password: record.password,
  };
}

// TODO: Error handling.
export default class UserService {
  constructor(store, logger) {
    this._store = store;
    this._model = store.model('User', UserSchema);
    this._logger = logger;
  }

  get(username) {
    this._logger.debug({ username }, LOG_TAG);
    return this._model.findOne({ username })
      .then(mapRecordToObject);
  }
}
