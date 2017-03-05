import Boom from 'boom';
import isEmpty from 'lodash.isempty';

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

    // TODO: Use a schema for input validation
    if (isEmpty(request.body.text)) return next(Boom.badData());

    this._entryService.create(request.body, request.accessTokenPayload.id)
      .then(entry => {
        this._logger.debug({ entry }, LOG_TAG);
        response.json(entry);
      })
      .catch(entryServiceError => {
        next(entryServiceError);
      });
  }

  handleIndex(request, response, next) {
    this._logger.debug('handleIndex', LOG_TAG);

    this._entryService.list(request.accessTokenPayload.id).then(entries => {
      this._logger.debug({ entries }, LOG_TAG);
      response.json(entries);
    })
    .catch(entryServiceError => {
      next(entryServiceError);
    });
  }

  handleUpdate(request, response, next) {
    this._logger.debug('handleUpdate', 'LOG_TAG');
    this._logger.debug({ body: request.body, params: request.params }, LOG_TAG);

    // TODO: Use a schema for input validation
    if (isEmpty(request.body.text)) return next(Boom.badData());

    this._entryService.update(request.params.entryId, request.accessTokenPayload.id, request.body)
      .then(entry => {
        this._logger.debug({ entry }, LOG_TAG);
        response.json(entry);
      })
      .catch(error => {
        next(error);
      });
  }

  handleDelete(request, response, next) {
    this._logger.debug('handleDelete', 'LOG_TAG');

    this._entryService.delete(request.params.entryId, request.accessTokenPayload.id)
      .then(() => {
        response.status(201).send();
      })
      .catch(error => {
        next(error);
      });
  }
}
