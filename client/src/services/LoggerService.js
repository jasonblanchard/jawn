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
    if (message instanceof Error) {
      message = {
        message: message.message,
        stack: message.stack,
      };
    }
    message = JSON.stringify(message, null, 2).replace(/\\n/g, '\n');
    return `\n${level}: ${tag}\n${message}`;
  }
}
