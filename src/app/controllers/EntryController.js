import jwt from 'jsonwebtoken';
import TokenUtils from 'app/utils/TokenUtils';

const LOG_TAG = 'EntryController';

export default class EntryController {
  constructor(store, entryService, logger, appSecret) {
    this._store = store;
    this._entryService = entryService;
    this._logger = logger;
    this._appSecret = appSecret;

    this.handleCreate = this.handleCreate.bind(this);
    this.handleIndex = this.handleIndex.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleCreate(request, response, next) {
    this._logger.debug('handleCreate', LOG_TAG);

    const token = TokenUtils.parseAuthorizationHeader(request.headers.authorization);
    this._logger.debug({ body: request.body, token }, LOG_TAG);
    jwt.verify(token, this._appSecret, (tokenError, parsedToken) => {
      if (tokenError) throw new Error('authentication failed'); // TODO: Do something with this;

      this._logger.debug({ userId: parsedToken.id }, LOG_TAG);

      this._entryService.create(request.body, parsedToken.id)
        .then(entry => {
          this._logger.debug({ entry }, LOG_TAG);
          response.json(entry);
        })
        .catch(entryServiceError => {
          next(entryServiceError);
        });
    });
  }

  handleIndex(request, response, next) {
    this._logger.debug('handleIndex', LOG_TAG);

    const token = TokenUtils.parseAuthorizationHeader(request.headers.authorization);
    jwt.verify(token, this._appSecret, (tokenError, parsedToken) => {
      if (tokenError) return next(new Error('authentication failed')); // TODO: Do something with this;

      this._entryService.list(parsedToken.id).then(entries => {
        this._logger.debug({ entries }, LOG_TAG);
        response.json(entries);
      })
      .catch(entryServiceError => {
        next(entryServiceError);
      });
    });
  }

  handleUpdate(request, response, next) {
    this._logger.debug('handleUpdate', 'LOG_TAG');
    this._logger.debug({ body: request.body, params: request.params }, LOG_TAG);

    const token = TokenUtils.parseAuthorizationHeader(request.headers.authorization);
    jwt.verify(token, this._appSecret, (tokenError, parsedToken) => {
      if (tokenError) return next(new Error('authentication failed')); // TODO: Do something with this;

      this._entryService.update(request.params.entryId, parsedToken.id, request.body)
        .then(entry => {
          this._logger.debug({ entry }, LOG_TAG);
          response.json(entry);
        })
        .catch(error => {
          next(error);
        });
    });
  }

  handleDelete(request, response, next) {
    this._logger.debug('handleDelete', 'LOG_TAG');

    const token = TokenUtils.parseAuthorizationHeader(request.headers.authorization);
    jwt.verify(token, this._appSecret, (tokenError, parsedToken) => {
      if (tokenError) return next(new Error('authentication failed')); // TODO: Do something with this;

      this._entryService.delete(request.params.entryId, parsedToken.id)
        .then(() => {
          response.status(201).send();
        })
        .catch(error => {
          next(error);
        });
    });
  }
}
