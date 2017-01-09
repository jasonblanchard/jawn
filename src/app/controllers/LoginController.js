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

  handlePost(req, res, next) {
    const { username, password } = req.body;
    this._logger.debug({ username }, LOG_TAG);

    this._userService.findForAuth(username)
      .then(user => {
        if (!user) {
          this._logger.debug('User does not exist', LOG_TAG);
          return res.status(400).json({ error: 'Username & password did not match' });
        }

        bcrypt.compare(password, user.password).then(result => {
          if (!result) {
            this._logger.debug('Password did not match', LOG_TAG);
            return res.status(400).json({ error: 'Username & password did not match' });
          }

          this._logger.debug({ user }, LOG_TAG);

          jwt.sign({ id: user.id }, this._appSecret, {}, (error, token) => {
            if (error) return Promise.reject(error);
            res.cookie('token', token); // TODO: httpOnly and secure in in dev
            res.json(Object.assign(user, { token }));
          });
        });
      })
      .catch(error => {
        next(error);
      });
  }
}
