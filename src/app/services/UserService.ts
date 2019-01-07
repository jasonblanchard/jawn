import UserConnector, { UserEntityInputParams } from 'app/services/UserConnector';

// TODO: Error handling.
export default class UserService {
  connector: UserConnector;

  constructor({ connector }: { connector: UserConnector }) {
    this.connector = connector;
  }

  findById(id: string) {
    return this.connector.findById(id);
  }

  findByUsername(username: string) {
    return this.connector.findByUsername(username);
  }

  // TODO: Use return types exported from UserConnector so these don't have to stay in sync?
  findForAuth(username: string) {
    return this.connector.findForAuth(username);
  }

  create(params: UserEntityInputParams) {
    return this.connector.create(params);
  }
}
