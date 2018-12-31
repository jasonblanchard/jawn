import UserConnector, { UserEntity, UserEntityInputParams, UserEntityWithAuth } from 'app/services/UserConnector';

// TODO: Error handling.
export default class UserService {
  _connector: any;

  constructor({ connector }: { connector: UserConnector }) {
    this._connector = connector;
  }

  findById(id: number): Promise<UserEntity> {
    return this._connector.findById(id);
  }

  findByUsername(username: string): Promise<UserEntity> {
    return this._connector.findByUsername(username);
  }

  // TODO: Use return types exported from UserConnector so these don't have to stay in sync?
  findForAuth(username: string): Promise<(UserEntityWithAuth)> {
    return this._connector.findForAuth(username);
  }

  create(params: UserEntityInputParams): Promise<UserEntity> {
    return this._connector.create(params);
  }
}
