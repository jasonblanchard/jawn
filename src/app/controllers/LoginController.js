import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const LOG_TAG = 'LoginController';

export default class LoginController {
  constructor(store, userService, logger, appSecret) {
    this._store = store;
    this._userService = userService;
    this._logger = logger;
    this._appSecret = appSecret;

    this.handlePost = this.handlePost.bind(this);
  }

  handlePost(request, response, next) {
    const { username, password } = request.body;
    this._logger.debug({ username }, LOG_TAG);

    this._userService.findForAuth(username)
      .then(user => {
        if (!user) {
          this._logger.debug('User does not exist', LOG_TAG);
          return response.status(400).json({ error: 'Username & password did not match' });
        }

        bcrypt.compare(password, user.password).then(result => {
          if (!result) {
            this._logger.debug('Password did not match', LOG_TAG);
            return response.status(400).json({ error: 'Username & password did not match' });
          }

          this._logger.debug({ user }, LOG_TAG);

          jwt.sign({ id: user.id }, this._appSecret, {}, (error, token) => {
            if (error) return Promise.reject(error);
            response.cookie('token', token); // TODO: httpOnly and secure in in dev
            response.json(Object.assign(user, { token }));
          });
        });
      })
      .catch(error => {
        next(error);
      });
  }
}
