import { Schema } from 'mongoose';
import moment from 'moment';

const LOG_TAG = 'EntryService';

const EntrySchema = new Schema({
  timeCreated: String,
  text: String
});

export default class EntryService {
  constructor(store, logger) {
    this._store = store;
    this._model = store.model('Entry', EntrySchema);
    this._logger = logger;

    this.create = this.create.bind(this);
  }

  list() {
    return this._model.find().then(records => {
      const entries = records.map(record => ({
        id: record.id,
        text: record.text,
        timeCreated: record.timeCreated
      }));

      this._logger.debug({ entries }, LOG_TAG);
      return entries;
    })
  }

  create(params) {
    const fields = Object.assign({}, params, { timeCreated: moment().format() });

    this._logger.debug({ fields }, LOG_TAG);

    const entry = new this._model(fields);

    return entry.save().then(record => {
      const entry = {
        id: record.id,
        text: record.text,
        timeCreated: record.timeCreated
      }

      this._logger.debug({ entry }, LOG_TAG);

      return entry;
    });
  }

  update(id, params) {
    this._logger.debug({ params }, LOG_TAG);

    return this._model.findByIdAndUpdate(id, { $set: params }, { new: true }).then(record => {
      const entry = {
        id: record.id,
        text: record.text,
        timeCreated: record.timeCreated
      }

      this._logger.debug({ entry }, LOG_TAG);

      return entry;
    });
  }
}
