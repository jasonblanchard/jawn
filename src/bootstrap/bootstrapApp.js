import express from 'express';

const LOG_TAG = 'app';

export default function(registry) {
  const { logger, entryController } = registry;

  logger.debug('\n>>> BOOTSTRAPPING APP <<<<\n', LOG_TAG);

  const app = express();

  app.get('/', (req, res) => {
    logger.debug('request received', LOG_TAG);
    res.send('Hello');
  });

  app.get('/entries', entryController.handleIndex);
  app.post('/entries', entryController.handlePost);

  return app;
}
