import EntryConnector, { EntryEntityInputParams, ListByUserInputParams } from 'app/services/EntryConnector'

// TODO: Error handling.
export default class EntryService {
  _connector: EntryConnector;

  constructor({ connector }: { connector: EntryConnector }) {
    this._connector = connector;
  }

  listByUser(userId: string, options?: ListByUserInputParams) {
    return this._connector.listByUser(userId, options);
  }

  create(params: EntryEntityInputParams, userId: string) {
    return this._connector.create(params, userId);
  }

  update(id: string, params: EntryEntityInputParams, userId:string) {
    return this._connector.update(id, params, userId);
  }

  delete(id:string, userId:string) {
    return this._connector.delete(id, userId);
  }
}
