import LoggerService, { LogLevelDesc } from 'app/services/LoggerService';

export default function() {
  return new LoggerService(<LogLevelDesc>process.env.LOG_LEVEL || 'ERROR');
}
