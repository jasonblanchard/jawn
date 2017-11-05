import LoggerService from 'src/services/LoggerService';

export default function() {
  const logLevel = window.__ENV.LOG_LEVEL ? window.__ENV.LOG_LEVEL : 'TRACE';
  return new LoggerService(logLevel);
}
