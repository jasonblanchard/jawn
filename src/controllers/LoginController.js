import bcrypt from 'bcrypt';

const LOG_TAG = 'LoginController';

export default class LoginController {
  constructor(store, userService, logger) {
    this._store = store;
    this._userService = userService;
    this._logger = logger;

    this.handlePost = this.handlePost.bind(this);
  }

  handlePost(req, res, next) {
    const { username, password } = req.body;
    this._logger.debug({ username, password }, LOG_TAG);
    this._userService.get(username)
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

          this._logger.debug({ user: Object.assign(user, { password: '***' }) }, LOG_TAG);
          delete user.password;
          res.json(Object.assign(user, { token: '1234' }));
        });
      })
      .catch(error => {
        next(error);
      });
  }
}
