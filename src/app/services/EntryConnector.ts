import LoggerService from 'app/services/LoggerService';
import mongoose, { Document, Schema } from 'mongoose';
import moment from 'moment';

const LOG_TAG = 'EntryConnector';

const EntrySchema = new Schema({
  text: String,
  timeCreated: { type: String, index: true },
  timeUpdated: String,
  userId: { type: String, index: true }, // TODO: Figure out how to build these indexes.
});

interface EntryRecord extends Document {
  text: string;
  timeCreated: string;
  timeUpdated: string;
  userId: string;
}

export interface EntryEntity {
  id: string;
  text: string;
  timeCreated: string;
  timeUpdated: string;
  userId: string;
}

export type EntryEntityInputParams = {
  text: string;
}

function mapRecordToObject(record: EntryRecord) {
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
  private _model: any;
  private _logger: LoggerService;

  constructor({ logger, store }: { store: any, logger: LoggerService}) {
    this._model = store.model('Entry', EntrySchema);
    this._logger = logger;
  }

  listByUser(userId: string, options: { since?: string, before?: string}) {
    this._logger.debug({ options }, LOG_TAG);

    const query = {
      userId,
      _id: {},
    };

    if (options.since) {
      const sinceObjectId = mongoose.Types.ObjectId.createFromTime(new Date(options.since).getTime() / 1000);
      query._id = { $gt: sinceObjectId };
    }

    if (options.before) {
      const beforeObjectId = mongoose.Types.ObjectId.createFromTime(new Date(options.before).getTime() / 1000);
      query._id = { ...query._id, ...{ $lt: beforeObjectId } };
    }

    return this._model.find(query).then((records: [EntryRecord]) => {
      const entries = records.map(mapRecordToObject);
      // this._logger.debug({ entries }, LOG_TAG);

      return entries;
    });
  }

  create(params: EntryEntityInputParams, userId: string) {
    const fields = Object.assign({}, params, { timeCreated: moment().format(), userId });
    this._logger.debug({ fields }, LOG_TAG);

    const entry = new this._model(fields);
    return entry.save().then(mapRecordToObject);
  }

  update(id: string, params: EntryEntityInputParams, userId: string) {
    const fields = Object.assign({}, params, { timeUpdated: moment().format() });
    const query = { _id: id, userId };
    this._logger.debug({ fields, query }, LOG_TAG);

    // TODO: If not found, raise an error.
    return this._model.findOneAndUpdate(query, { $set: fields }, { new: true }).then(mapRecordToObject);
  }

  delete(id: string, userId: string) {
    // TODO: If not found, raise an error;
    return this._model.remove({ _id: id, userId })
      .then(() => ({
        id,
      }));
  }
}
