import { Request } from "express";
import EntryService from 'app/services/EntryService';
import EntryConnector from 'app/services/EntryConnector';
import LoggerService from 'app/services/LoggerService';
import UserService from 'app/services/UserService';
import UserConnector from 'app/services/UserConnector';
import schema from 'app/schema/schema';

interface GraphQLRequest extends Request {
  accessTokenPayload: {
    id: string
  }
}

export default class GraphqlService {
  private _store: any;
  private _logger: LoggerService;

  constructor({ store, logger }: { store: any, logger: LoggerService}) {
    this._store = store;
    this._logger = logger;
  }

  handleRequest = (request: GraphQLRequest) => {
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
