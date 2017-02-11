import http from 'superagent';

const LOG_TAG = 'AuthenticationService';

export default class AuthenticationService {
  constructor(logger) {
    this._logger = logger;
  }

  login(username, password) {
    return http.post('/api/login')
      .send({ username, password })
      .then(response => {
        const currentUser = response.body;
        this._logger.debug({ currentUser }, LOG_TAG);

        return currentUser;
      });
  }
}
