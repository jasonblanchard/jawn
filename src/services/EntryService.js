import { Schema } from 'mongoose';

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
      this._model.find((error, entries) => {
        if (error) {
          this._logger.error(error, LOG_TAG);
          return reject(error);
        }

        this._logger.debug({ entries }, LOG_TAG);
        return resolve(entries);
      })
    })
  }

  create(fields) {
    this._logger.debug({ fields }, LOG_TAG);
    const entry = new this._model(fields);
    return new Promise((resolve, reject) => {
      entry.save((error, entry) => {
        if (error) {
          this._logger.error(error, LOG_TAG);
          return reject(error);
        }

        this._logger.debug({ entry }, LOG_TAG);
        return resolve(entry);
      });
    });
  }
}
