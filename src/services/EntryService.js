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
    return new Promise((resolve, reject) => {
      this._model.find((error, records) => {
        if (error) {
          this._logger.error(error, LOG_TAG);
          return reject(error);
        }

        const entries = records.map(record => ({
          id: record.id,
          text: record.text,
          timeCreated: record.timeCreated
        }));

        this._logger.debug({ entries }, LOG_TAG);
        return resolve(entries);
      })
    })
  }

  create(params) {
    const fields = Object.assign({}, params, { timeCreated: moment().format() });

    this._logger.debug({ fields }, LOG_TAG);

    const entry = new this._model(fields);
    return new Promise((resolve, reject) => {
      entry.save((error, record) => {
        if (error) {
          this._logger.error(error, LOG_TAG);
          return reject(error);
        }

        const { _id: id, text, timeCreated } = record;
        const entry = { id, text, timeCreated };

        this._logger.debug({ entry }, LOG_TAG);

        return resolve(entry);
      });
    });
  }
}
