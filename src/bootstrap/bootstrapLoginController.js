import LoginController from 'src/controllers/LoginController';

export default function(registry) {
  const { store, userService, logger } = registry;
  return new LoginController(store, userService, logger, process.env.APP_SECRET);
}
