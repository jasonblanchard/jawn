import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

const LOG_TAG = 'app';

const NODE_ENV = process.env.NODE_ENV || 'development';

export default function(registry) {
  const appSecret = process.env.APP_SECRET;
  const { logger, entryController, loginController, userService } = registry;

  logger.debug('\n>>> BOOTSTRAPPING APP <<<<\n', LOG_TAG);

  const app = express();

  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use('/static', express.static(path.join(__dirname, '../../../client/build/static')));

  app.post('/api/login', loginController.handlePost);
  app.get('/api/entries', entryController.handleIndex);
  app.post('/api/entries', entryController.handleCreate);
  app.post('/api/entries/:entryId', entryController.handleUpdate);
  app.delete('/api/entries/:entryId', entryController.handleDelete);

  app.use('/api/*', (request, response) => {
    logger.error({ noMatchingRoute: request.originalUrl }, LOG_TAG);
    response.status(404).json({ error: 'No resource at this route' });
  });

  app.get('*', (request, response, next) => {
    const token = request.cookies.token;
    logger.debug({ token }, LOG_TAG);

    jwt.verify(token, appSecret, (parseError, parsedToken) => {
      if (parseError) {
        logger.error(parseError, LOG_TAG);
      }

      logger.debug({ parsedToken }, LOG_TAG);
      const id = parsedToken ? parsedToken.id : undefined;

      userService.findById(id).then(user => {
        logger.debug({ user }, LOG_TAG);

        user = Object.assign({}, user, { token });

        fs.readFile(path.join(__dirname, '../../../client/build', 'index.html'), 'utf8', (error, file) => {
          if (!file) return next();
          file = file.replace('__INITIAL_STATE={}', `__INITIAL_STATE=${JSON.stringify({ app: { currentUser: user } })}`);
          file = file.replace('__ENV={}', `__ENV={NODE_ENV: '${NODE_ENV}', LOG_LEVEL: '${process.env.LOG_LEVEL}'}`);
          response.set('Content-Type', 'text/html');
          response.send(file);
        });
      });
    });
  });

  app.use((error, request, response) => {
    logger.error({ error, stack: error.stack }, LOG_TAG);
    response.status(500).json({ error: 'Something went wrong' });
  });

  return app;
}
