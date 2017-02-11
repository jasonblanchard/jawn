import AuthenticationService from 'src/services/AuthenticationService';

export default function(registry) {
  const logger = registry.logger;

  return new AuthenticationService(logger);
}
