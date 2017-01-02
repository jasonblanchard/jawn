import bodyParser from 'body-parser';
import express from 'express';

const LOG_TAG = 'app';

export default function(registry) {
  const { logger, entryController } = registry;

  logger.debug('\n>>> BOOTSTRAPPING APP <<<<\n', LOG_TAG);

  const app = express();
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    logger.debug('request received', LOG_TAG);
    res.send('Hello');
  });

  // TODO: Error handling
  app.get('/api/entries', entryController.handleIndex);
  app.post('/api/entries', entryController.handleCreate);
  app.post('/api/entries/:entryId', entryController.handleUpdate);
  app.delete('/api/entries/:entryId', entryController.handleDelete);

  return app;
}
