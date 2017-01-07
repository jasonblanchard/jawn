import LoggerService from 'src/services/LoggerService';

export default function() {
  const logLevel = window.ENV ? window.ENV.LOG_LEVEL : 'TRACE';
  return new LoggerService(logLevel);
}
