import LoggerService from 'src/services/LoggerService';

export default function() {
  return new LoggerService(process.env.LOG_LEVEL);
}
