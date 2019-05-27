import { Request, Response, NextFunction } from "express";
import Boom from 'boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Logger from 'app/services/LoggerService';

import UserService from 'app/services/UserService';

const LOG_TAG = 'LoginController';
const SALT_ROUNDS = 10;

export default class LoginController {
  private userService: UserService;
  private logger: Logger;
  private appSecret: string;

  constructor(userService: UserService, logger: Logger, appSecret: string) {
    this.userService = userService;
    this.logger = logger;
    this.appSecret = appSecret;
  }

  handleLogin = (request: Request, response: Response, next: NextFunction) => {
    if (!request.body.username || !request.body.password) return next(Boom.badRequest('Username or password not provided'));

    const { username, password } = request.body;
    this.logger.debug({ username }, LOG_TAG);

    this.userService.findForAuth(username)
      .then((user) => {
        if (!user) {
          this.logger.debug('User does not exist', LOG_TAG);
          return next(Boom.unauthorized('Username & password do not match'));
        }

        bcrypt.compare(password, user.password).then(result => {
          if (!result) {
            this.logger.debug('Password did not match', LOG_TAG);
            return next(Boom.unauthorized('Username & password do not match'));
          }

          delete user.password;
          this.logger.debug({ user }, LOG_TAG);

          jwt.sign({ id: user.id }, this.appSecret, {}, (error, token) => {
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

    this.userService.findForAuth(username)
      .then((user) => {
        this.logger.debug({ user }, LOG_TAG);
        if (user) throw Boom.conflict('Username is taken');
        return this.hashPassword(password, SALT_ROUNDS);
      })
      .then((hashedPassword) => {
        return this.userService.create({ email, username, password: hashedPassword });
      })
      .then(() => {
        response.status(204).send();
      })
      .catch((error) => {
        next(error);
      });
  }

  hashPassword = (password: string, saltRounds: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (error, hash) => {
        if (error) return reject(error);
        return resolve(hash);
      });
    });
  }
}
