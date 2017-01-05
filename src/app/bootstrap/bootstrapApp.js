import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';
import path from 'path';

const LOG_TAG = 'app';

export default function(registry) {
  const { logger, entryController, loginController } = registry;

  logger.debug('\n>>> BOOTSTRAPPING APP <<<<\n', LOG_TAG);

  const app = express();
  app.use(bodyParser.json());

  app.use(express.static(path.join(__dirname, '../../../client/build')));

  app.post('/api/login', loginController.handlePost);

  app.get('/api/entries', entryController.handleIndex);
  app.post('/api/entries', entryController.handleCreate);
  app.post('/api/entries/:entryId', entryController.handleUpdate);
  app.delete('/api/entries/:entryId', entryController.handleDelete);

  app.use('/api/*', (request, response) => {
    logger.error({ noMatchingRoute: request.originalUrl }, LOG_TAG);
    response.status(404).json({ error: 'No resource at this route' });
  });

  app.get('*', (request, response) => {
    fs.readFile(path.join(__dirname, '../../../client/build', 'index.html'), 'utf8', (error, file) => {
      file = file.replace('%INITIAL_STATE%', '{}');
      response.set('Content-Type', 'text/html');
      response.send(file);
    });
  });

  app.use((error, request, response) => {
    logger.error({ error, stack: error.stack }, LOG_TAG);
    response.status(500).json({ error: 'Something went wrong' });
  });

  return app;
}
