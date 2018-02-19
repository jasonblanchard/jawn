import Boom from 'boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const LOG_TAG = 'LoginController';
const SALT_ROUNDS = 10;

export default class LoginController {
  constructor(store, userService, logger, appSecret) {
    this._store = store;
    this._userService = userService;
    this._logger = logger;
    this._appSecret = appSecret;
  }

  handleLogin = (request, response, next) => {
    if (!request.body.username || !request.body.password) return next(Boom.badRequest('Username or password not provided'));

    const { username, password } = request.body;
    this._logger.debug({ username }, LOG_TAG);

    this._userService.findForAuth(username)
      .then(user => {
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
      .catch(error => {
        next(error);
      });
  }

  handleSignUp = (request, response, next) => {
    const { email, username, password } = request.body;
    if (!email || !username || !password) return next(Boom.badRequest('Username or password not provided'));

    this._userService.findForAuth(username)
      .then(user => {
        this._logger.debug({ user }, LOG_TAG);
        if (user) return next(Boom.conflict('Username is taken'));
        return this.hashPassword(password, SALT_ROUNDS);
      })
      .then(hashedPassword => {
        return this._userService.create({ email, username, password: hashedPassword });
      })
      .then(() => {
        response.status(204).send();
      })
      .catch(error => {
        next(error);
      });
  }

  hashPassword = (password, saltRounds) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (error, hash) => {
        if (error) return reject(error);
        return resolve(hash);
      });
    });
  }
}
