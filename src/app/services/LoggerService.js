import logger from 'loglevel';

// TODO: Build this out.
export default class LoggerService {
  constructor(loglevel) {
    this._logger = logger;
    logger.setLevel(loglevel);
  }

  info(message, tag) {
    this._logger.debug(LoggerService.format('INFO', message, tag));
  }

  debug(message, tag) {
    this._logger.debug(LoggerService.format('DEBUG', message, tag));
  }

  error(message, tag) {
    this._logger.error(LoggerService.format('ERROR', message, tag));
  }

  static format(level, message, tag) {
    return `\n${level}: ${tag}\n${JSON.stringify(message, null, 2)}`;
  }
}
