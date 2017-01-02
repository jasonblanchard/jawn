const LOG_TAG = 'EntryController';

export default class EntryController {
  constructor(store, entryService, logger) {
    this._store = store;
    this._entryService = entryService;
    this._logger = logger;

    this.handleCreate = this.handleCreate.bind(this);
    this.handleIndex = this.handleIndex.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleCreate(req, res) {
    this._logger.debug('handleCreate', LOG_TAG);
    this._logger.debug({ body: req.body }, LOG_TAG);
    this._entryService.create(req.body)
      .then(entry => {
        this._logger.debug({ entry }, LOG_TAG);
        res.json(entry);
      });
  }

  handleIndex(req, res) {
    this._logger.debug('handleIndex', LOG_TAG);
    this._entryService.list().then(entries => {
      this._logger.debug({ entries }, LOG_TAG);
      res.json(entries);
    });
  }

  handleUpdate(req, res) {
    this._logger.debug('handleUpdate', 'LOG_TAG');
    this._logger.debug({ body: req.body, params: req.params }, LOG_TAG);
    this._entryService.update(req.params.entryId, req.body)
      .then(entry => {
        this._logger.debug({ entry }, LOG_TAG);
        res.json(entry);
      })
  }
}
