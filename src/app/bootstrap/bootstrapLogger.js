import LoggerService from 'app/services/LoggerService';

export default function() {
  return new LoggerService(process.env.LOG_LEVEL);
}
