import {Request, Response, NextFunction} from "express";
import Boom from 'boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Logger from 'app/services/LoggerService';

import UserService from 'app/services/UserService';

const LOG_TAG = 'LoginController';
const SALT_ROUNDS = 10;

export default class LoginController {
  _store: any;
  _userService: UserService;
  _logger: Logger;
  _appSecret: string;

  constructor(store: any, userService: UserService, logger: Logger, appSecret: string) {
    this._store = store;
    this._userService = userService;
    this._logger = logger;
    this._appSecret = appSecret;
  }

  handleLogin = (request: Request, response: Response, next: NextFunction) => {
    if (!request.body.username || !request.body.password) return next(Boom.badRequest('Username or password not provided'));

    const { username, password } = request.body;
    this._logger.debug({ username }, LOG_TAG);

    this._userService.findForAuth(username)
      .then((user) => {
        if (!user) {
          this._logger.debug('User does not exist', LOG_TAG);
          return next(Boom.unauthorized('Username & password do not match'));
        }

        bcrypt.compare(password, user.password).then(result => {
          if (!result) {
            this._logger.debug('Password did not match', LOG_TAG);
            return next(Boom.unauthorized('Username & password do not match'));
          }

          delete user.password;
          this._logger.debug({ user }, LOG_TAG);

          jwt.sign({ id: user.id }, this._appSecret, {}, (error, token) => {
            if (error) return Promise.reject(error);
            response.cookie('token', token); // TODO: secure in !dev
            response.status(204).send();
          });
        });
      })
      .catch((error) => {
        next(error);
      });
  }

  handleSignUp = (request: Request, response: Response, next: NextFunction) => {
    const { email, username, password } = request.body;
    if (!email || !username || !password) return next(Boom.badRequest('Username or password not provided'));

    this._userService.findForAuth(username)
      .then((user): Promise<any> => {
        this._logger.debug({ user }, LOG_TAG);
        if (user) throw Boom.conflict('Username is taken');
        return this.hashPassword(password, SALT_ROUNDS);
      })
      .then((hashedPassword: string) => {
        return this._userService.create({ email, username, password: hashedPassword });
      })
      .then(() => {
        response.status(204).send();
      })
      .catch((error) => {
        next(error);
      });
  }

  hashPassword = (password: string, saltRounds: number) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (error, hash) => {
        if (error) return reject(error);
        return resolve(hash);
      });
    });
  }
}
