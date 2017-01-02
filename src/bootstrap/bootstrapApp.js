import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';

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

  app.get('/api/entries', entryController.handleIndex);
  app.post('/api/entries', entryController.handleCreate);
  app.post('/api/entries/:entryId', entryController.handleUpdate);
  app.delete('/api/entries/:entryId', entryController.handleDelete);

  app.use('*', (request, response) => {
    response.status(404).json({ error: 'No resource at this route' });
  });

  app.use((error, request, response, next) => {
    logger.error({ error, stack: error.stack }, LOG_TAG);
    response.status(500).json({ error: 'Something went wrong' });
  });

  return app;
}
