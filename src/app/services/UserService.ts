import UserConnector, { UserEntityInputParams } from 'app/services/UserConnector';

// TODO: Error handling.
export default class UserService {
  _connector: UserConnector;

  constructor({ connector }: { connector: UserConnector }) {
    this._connector = connector;
  }

  findById(id: string) {
    return this._connector.findById(id);
  }

  findByUsername(username: string) {
    return this._connector.findByUsername(username);
  }

  // TODO: Use return types exported from UserConnector so these don't have to stay in sync?
  findForAuth(username: string) {
    return this._connector.findForAuth(username);
  }

  create(params: UserEntityInputParams) {
    return this._connector.create(params);
  }
}
