import AuthenticationService from 'src/services/AuthenticationService';

export default function(registry) {
  const NODE_ENV = window.__ENV.NODE_ENV ? window.__ENV.NODE_ENV : 'development';
  const isLocalStorageEnabled = NODE_ENV === 'development';
  const logger = registry.logger;

  return new AuthenticationService(isLocalStorageEnabled, logger);
}
