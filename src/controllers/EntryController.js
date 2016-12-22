const LOG_TAG = 'EntryController';

export default class EntryController {
  constructor(store, entryService, logger) {
    this._store = store;
    this._entryService = entryService;
    this._logger = logger;

    this.handlePost = this.handlePost.bind(this);
    this.handleIndex = this.handleIndex.bind(this);
  }

  handlePost(req, res) {
    this._logger.debug('handlePost', LOG_TAG);
    this._logger.debug({ body: req.body }, LOG_TAG);
    this._entryService.create(req.body)
      .then(entry => {
        this._logger.debug({ entry }, LOG_TAG);
        res.json(entry);
      });
  }

  handleIndex(req, res) {
    this._logger.debug('index', LOG_TAG);
    this._entryService.list().then(entries => {
      res.json(entries);
    });
  }
}
