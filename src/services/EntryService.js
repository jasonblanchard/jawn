import { Schema } from 'mongoose';
import moment from 'moment';

const LOG_TAG = 'EntryService';

const EntrySchema = new Schema({
  text: String,
  timeCreated: String,
  timeUpdated: String
});

function mapRecordToObject(record) {
  return {
    id: record.id,
    text: record.text,
    timeCreated: record.timeCreated,
    timeUpdated: record.timeUpdated
  }
}

// TODO: Error handling.
export default class EntryService {
  constructor(store, logger) {
    this._store = store;
    this._model = store.model('Entry', EntrySchema);
    this._logger = logger;

    this.create = this.create.bind(this);
  }

  list() {
    return this._model.find().then(records => {
      const entries = records.map(mapRecordToObject);
      this._logger.debug({ entries }, LOG_TAG);

      return entries;
    })
  }

  create(params) {
    const fields = Object.assign({}, params, { timeCreated: moment().format() });
    this._logger.debug({ fields }, LOG_TAG);

    const entry = new this._model(fields);
    return entry.save().then(mapRecordToObject);
  }

  update(id, params) {
    const fields = Object.assign({}, params, { timeUpdated: moment().format() });
    this._logger.debug({ fields }, LOG_TAG);

    return this._model.findByIdAndUpdate(id, { $set: fields }, { new: true }).then(mapRecordToObject);
  }

  delete(id) {
    return this._model.remove({ _id: id });
  }
}
