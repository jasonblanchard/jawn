import http from 'superagent';

const LOG_TAG = 'AuthenticationService';

export default class AuthenticationService {
  constructor(isLocalStorageEnabled, logger) {
    this._isLocalStorageEnabled = isLocalStorageEnabled;
    this._logger = logger;
  }

  login(username, password) {
    return http.post('/api/login')
      .send({ username, password })
      .then(response => {
        const currentUser = response.body;
        this._logger.debug({ currentUser, isLocalStorageEnabled: this._isLocalStorageEnabled }, LOG_TAG);

        // TODO: Only do this in dev. Merge with current state? Encapsulate in a LocalStorageService.
        if (this._isLocalStorageEnabled) {
          localStorage.setItem('appState', JSON.stringify({ currentUser }));
        }

        return currentUser;
      });
  }
}
