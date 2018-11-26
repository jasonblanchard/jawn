import mongoose, { Schema } from 'mongoose';
import moment from 'moment';

const LOG_TAG = 'EntryConnector';

const EntrySchema = new Schema({
  text: String,
  timeCreated: { type: String, index: true },
  timeUpdated: String,
  userId: { type: String, index: true }, // TODO: Figure out how to build these indexes.
});

function mapRecordToObject(record) {
  return {
    id: record.id,
    text: record.text || '',
    timeCreated: record.timeCreated,
    timeUpdated: record.timeUpdated,
    userId: record.userId,
  };
}

// TODO: Error handling.
export default class EntryConnector {
  constructor({ store, logger }) {
    this._store = store;
    this._model = store.model('Entry', EntrySchema);
    this._logger = logger;
  }

  listByUser(userId, options) {
    this._logger.debug({ options }, LOG_TAG);

    const query = {
      userId,
    };

    if (options.since) {
      const sinceObjectId = mongoose.Types.ObjectId.createFromTime(new Date(options.since).getTime() / 1000);
      query._id = { $gt: sinceObjectId };
    }

    if (options.before) {
      const beforeObjectId = mongoose.Types.ObjectId.createFromTime(new Date(options.before).getTime() / 1000);
      query._id = { ...query._id, ...{ $lt: beforeObjectId } };
    }

    return this._model.find(query).then(records => {
      const entries = records.map(mapRecordToObject);
      // this._logger.debug({ entries }, LOG_TAG);

      return entries;
    });
  }

  create(params, userId) {
    const fields = Object.assign({}, params, { timeCreated: moment().format(), userId });
    this._logger.debug({ fields }, LOG_TAG);

    const entry = new this._model(fields);
    return entry.save().then(mapRecordToObject);
  }

  update(id, params, userId) {
    const fields = Object.assign({}, params, { timeUpdated: moment().format() });
    const query = { _id: id, userId };
    this._logger.debug({ fields, query }, LOG_TAG);

    // TODO: If not found, raise an error.
    return this._model.findOneAndUpdate(query, { $set: fields }, { new: true }).then(mapRecordToObject);
  }

  delete(id, userId) {
    // TODO: If not found, raise an error;
    return this._model.remove({ _id: id, userId })
      .then(() => ({
        id,
      }));
  }
}
