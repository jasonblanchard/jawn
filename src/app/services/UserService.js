// TODO: Error handling.
export default class UserService {
  constructor({ connector }) {
    this._connector = connector;
  }

  findById(id) {
    return this._connector.findById(id);
  }

  findByUsername(username) {
    return this._connector.findByUsername(username);
  }

  findForAuth(username) {
    return this._connector.findForAuth(username);
  }

  create(params) {
    return this._connector.create(params);
  }
}
