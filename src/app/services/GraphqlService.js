import EntryService from 'app/services/EntryService';
import EntryConnector from 'app/services/EntryConnector';
import UserService from 'app/services/UserService';
import UserConnector from 'app/services/UserConnector';
import schema from 'app/schema/schema';

export default class GraphqlService {
  constructor({ store, logger }) {
    this._store = store;
    this._logger = logger;
  }

  handleRequest = request => {
    const entryService = new EntryService({
      connector: new EntryConnector({ store: this._store, logger: this._logger }),
    });

    const userService = new UserService({
      connector: new UserConnector({ store: this._store, logger: this._logger }),
    });

    return {
      schema,
      context: {
        userId: request.accessTokenPayload.id,
        services: {
          entryService,
          userService,
        },
      },
    };
  }
}
