import logger, { LogLevelDesc } from 'loglevel';

// TODO: Build this out.
export default class LoggerService {
  private _logger: logger.Logger;

  constructor(loglevel: LogLevelDesc) {
    this._logger = logger;
    logger.setLevel(loglevel);
  }

  info(message: any, tag: string) {
    this._logger.debug(LoggerService.format('INFO', message, tag));
  }

  debug(message: any, tag: string) {
    this._logger.debug(LoggerService.format('DEBUG', message, tag));
  }

  error(message: any, tag: string) {
    this._logger.error(LoggerService.format('ERROR', message, tag));
  }

  static format(level: string, message: any, tag: string) {
    return `\n${level}: ${tag}\n${JSON.stringify(message, null, 2)}`;
  }
}
