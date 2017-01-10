import { Schema } from 'mongoose';
import moment from 'moment';

const LOG_TAG = 'EntryService';

const EntrySchema = new Schema({
  text: String,
  timeCreated: String,
  timeUpdated: String,
  userId: { type: [String], index: true }, // TODO: Figure out how to build these indexes.
});

function mapRecordToObject(record) {
  return {
    id: record.id,
    text: record.text,
    timeCreated: record.timeCreated,
    timeUpdated: record.timeUpdated,
    userId: record.userId,
  };
}

// TODO: Error handling.
export default class EntryService {
  constructor(store, logger) {
    this._store = store;
    this._model = store.model('Entry', EntrySchema);
    this._logger = logger;

    this.create = this.create.bind(this);
  }

  list(userId) {
    return this._model.find({ userId }).then(records => {
      const entries = records.map(mapRecordToObject);
      this._logger.debug({ entries }, LOG_TAG);

      return entries;
    });
  }

  create(params, userId) {
    const fields = Object.assign({}, params, { timeCreated: moment().format(), userId });
    this._logger.debug({ fields }, LOG_TAG);

    const entry = new this._model(fields);
    return entry.save().then(mapRecordToObject);
  }

  update(id, userId, params) {
    const fields = Object.assign({}, params, { timeUpdated: moment().format() });
    const query = { _id: id, userId };
    this._logger.debug({ fields, query }, LOG_TAG);

    // TODO: If not found, raise an error.
    return this._model.findOneAndUpdate(query, { $set: fields }, { new: true }).then(mapRecordToObject);
  }

  delete(id, userId) {
    // TODO: If not found, raise an error;
    return this._model.remove({ _id: id, userId });
  }
}
