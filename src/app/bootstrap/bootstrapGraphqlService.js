import GraphqlService from 'app/services/GraphqlService';
import UserService from 'app/services/UserService';
import UserConnector from 'app/services/UserConnector';

export default function(registry) {
  const { logger, store } = registry;
  return new GraphqlService({ store, logger });
}
