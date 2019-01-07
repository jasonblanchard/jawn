import { Registry } from './registry';
import LoginController from 'app/controllers/LoginController';

export default function(registry: Registry) {
  const { userService, logger } = registry;
  return new LoginController(userService, logger, process.env.APP_SECRET || '');
}
