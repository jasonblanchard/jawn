import { Schema } from 'mongoose';
import DataLoader from 'DataLoader';

const LOG_TAG = 'UserConnector';

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
export default class UserConnector {
  constructor({ store, logger }) {
    this._store = store;
    this._model = store.model('User', UserSchema);
    this._logger = logger;
    this._userIdLoader = new DataLoader(ids => this._batchLoadById(ids));
  }

  _batchLoadById(ids) {
    this._logger.debug({ ids }, LOG_TAG);

    return this._model.find({
      _id: {
        $in: ids,
      },
    })
      .then(records => {
        return records.map(mapRecordToObject);
      })
      .then(entities => {
        this._logger.debug({ entities }, LOG_TAG);

        const entitiesById = entities.reduce((accum, entity) => {
          accum[entity.id] = entity;
          return accum;
        }, {});

        // Ensure that the return value is same length as `ids` and is in the same order https://github.com/facebook/dataloader#batch-function
        return ids.map(id => entitiesById[id]);
      });
  }

  findById = id => {
    if (!id) return Promise.resolve();
    return this._userIdLoader.load(id);
  }

  findByUsername(username) {
    this._logger.debug({ username }, LOG_TAG);
    return this._model.findOne({ username })
      .then(mapRecordToObject);
  }

  findForAuth(username) {
    this._logger.debug({ username }, LOG_TAG);
    return this._model.findOne({ username })
      .then(user => {
        if (!user) return undefined; // TODO: Raise error
        return Object.assign({}, mapRecordToObject(user), { password: user.password });
      });
  }
}
