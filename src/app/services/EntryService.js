// TODO: Error handling.
export default class EntryService {
  constructor({ connector }) {
    this._connector = connector;
  }

  listByUser(userId) {
    return this._connector.listByUser(userId);
  }

  create(params, userId) {
    return this._connector.create(params, userId);
  }

  update(id, params, userId) {
    return this._connector.update(id, params, userId);
  }

  delete(id, userId) {
    return this._connector.delete(id, userId);
  }
}
