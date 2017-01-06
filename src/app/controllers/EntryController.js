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

  handleCreate(req, res, next) {
    this._logger.debug('handleCreate', LOG_TAG);
    const token = TokenUtils.parseAuthorizationHeader(req.headers.authorization);
    this._logger.debug({ body: req.body, token }, LOG_TAG);
    jwt.verify(token, this._appSecret, (error, parsedToken) => {
      if (error) throw new Error('authentication failed'); // TODO: Do something with this;

      this._logger.debug({ userId: parsedToken.id }, LOG_TAG);

      this._entryService.create(req.body, parsedToken.id)
        .then(entry => {
          this._logger.debug({ entry }, LOG_TAG);
          res.json(entry);
        })
        .catch(entryServiceError => {
          next(entryServiceError);
        });
    });
  }

  handleIndex(req, res, next) {
    this._logger.debug('handleIndex', LOG_TAG);
    const token = TokenUtils.parseAuthorizationHeader(req.headers.authorization);
    jwt.verify(token, this._appSecret, (error, parsedToken) => {
      if (error) return next(new Error('authentication failed')); // TODO: Do something with this;

      this._entryService.list(parsedToken.id).then(entries => {
        this._logger.debug({ entries }, LOG_TAG);
        res.json(entries);
      })
      .catch(entryServiceError => {
        next(entryServiceError);
      });
    });
  }

  handleUpdate(req, res, next) {
    // TODO: Authorization
    this._logger.debug('handleUpdate', 'LOG_TAG');
    this._logger.debug({ body: req.body, params: req.params }, LOG_TAG);
    this._entryService.update(req.params.entryId, req.body)
      .then(entry => {
        this._logger.debug({ entry }, LOG_TAG);
        res.json(entry);
      })
      .catch(error => {
        next(error);
      });
  }

  handleDelete(req, res, next) {
    // TODO: Authorization
    this._logger.debug('handleDelete', 'LOG_TAG');
    this._entryService.delete(req.params.entryId)
      .then(() => {
        res.status(201).send();
      })
      .catch(error => {
        next(error);
      });
  }
}
