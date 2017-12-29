// TODO: Error handling.
export default class UserService {
  constructor({ connector }) {
    this._connector = connector;
  }

  loadByUserId(id) {
    return this._connector.loadByUserId(id);
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
}
