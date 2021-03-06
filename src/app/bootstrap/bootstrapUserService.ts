import { Registry } from './registry';
import UserService from 'app/services/UserService';
import UserConnector from 'app/services/UserConnector';

export default function(registry: Registry) {
  const { store, logger } = registry;
  return new UserService({
    connector: new UserConnector({ store, logger }),
  });
}
