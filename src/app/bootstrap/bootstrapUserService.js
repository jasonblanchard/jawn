import UserService from 'app/services/UserService';

export default function(registry) {
  const { store, logger } = registry;
  return new UserService(store, logger);
}
