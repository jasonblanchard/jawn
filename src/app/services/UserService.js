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
  };
}

// TODO: Error handling.
export default class UserService {
  constructor(store, logger) {
    this._store = store;
    this._model = store.model('User', UserSchema);
    this._logger = logger;
  }

  findById(id) {
    this._logger.debug({ id }, LOG_TAG);

    if (!id) return Promise.resolve();

    return this._model.findOne({ _id: id })
      .then(mapRecordToObject);
  }

  findByUsername(username) {
    this._logger.debug({ username }, LOG_TAG);
    return this._model.findOne({ username })
      .then(mapRecordToObject);
  }

  findForAuth(username) {
    this._logger.debug({ username }, LOG_TAG);
    return this._model.findOne({ username })
      .then(user => Object.assign({}, mapRecordToObject(user), { password: user.password }));
  }
}
