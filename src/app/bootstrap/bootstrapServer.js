import bodyParser from 'body-parser';
import Boom from 'boom';
import cookieParser from 'cookie-parser';
import DataLoader from 'dataLoader';
import express from 'express';
import expressJwt from 'express-jwt';
import fs from 'fs';
import get from 'lodash.get';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import morgan from 'morgan';
import path from 'path';
import TokenUtils from 'app/utils/TokenUtils';

import GraphqlService from 'app/services/GraphqlService';
import UserService from 'app/services/UserService';
import UserConnector from 'app/services/UserConnector';

const LOG_TAG = 'app';
const BUILD_PATH = '../../../client/build';

const NODE_ENV = process.env.NODE_ENV || 'development';

export default function(registry) {
  const appSecret = process.env.APP_SECRET;
  const { logger, entryController, loginController } = registry;

  const userService = new UserService({
    connector: new UserConnector({ store: registry.store, logger: registry.logger })
  });

  logger.debug('\n>>> BOOTSTRAPPING APP <<<<\n', LOG_TAG);

  const app = express();

  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use('/static', express.static(path.join(__dirname, BUILD_PATH + '/static')));
  app.use(morgan(NODE_ENV === 'development' ? 'dev' : 'combined'));
  // TODO: Include audience and issuer values?
  app.use(expressJwt({
    secret: appSecret,
    requestProperty: 'accessTokenPayload',
    getToken: request => TokenUtils.parseAuthorizationHeader(request.headers.authorization),
    credentialsRequired: false, // TODO: Replace with `unless` values when using client-side router.
  }));

  app.post('/api/login', loginController.handlePost);
  app.get('/api/entries', entryController.handleIndex);
  app.post('/api/entries', entryController.handleCreate);
  app.post('/api/entries/:entryId', entryController.handleUpdate);
  app.delete('/api/entries/:entryId', entryController.handleDelete);

  const graphqlService = new GraphqlService({ store: registry.store, logger: registry.logger }); // TODO: Move to registry
  app.use('/api/graphql', graphqlExpress(request => graphqlService.handleRequest(request)));

  app.use('/api/graphiql', graphiqlExpress({
    endpointURL: '/api/graphql',
    passHeader: "'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNDAwYWZlYmY1NjE0Nzc4ZjQxZjYyYSIsImlhdCI6MTUxNDE0NjYwN30.EPHDw7plbZgHMMgFsWrOgynFf9yXsBfvFLaa_KRcVyU'",
  }));

  app.use('/api/*', (request, response, next) => {
    next(Boom.notFound());
  });

  app.get('*', (request, response, next) => {
    const id = get(request, 'accessTokenPayload.id');
    userService.findById(id)
      .then(user => {
        logger.debug({ user: user || {} }, LOG_TAG);

        const token = request.cookies.token;
        user = Object.assign({}, user, { token });

        fs.readFile(path.join(__dirname, BUILD_PATH, 'index.html'), 'utf8', (error, file) => {
          if (error) return next(error);
          if (!file) return next();
          file = file.replace('__INITIAL_STATE={}', `__INITIAL_STATE=${JSON.stringify({ currentUser: user })}`);
          file = file.replace('__ENV={}', `__ENV={NODE_ENV: '${NODE_ENV}', LOG_LEVEL: '${process.env.LOG_LEVEL}'}`);
          response.set('Content-Type', 'text/html');
          response.send(file);
        });
      })
      .catch((error) => {
        next(error);
      });
  });

  app.use((error, request, response, next) => { // eslint-disable-line no-unused-vars
    if (error.name === 'UnauthorizedError') {
      error = Boom.unauthorized();
    }
    error = error.isBoom ? error : Boom.boomify(error);
    error.reformat();
    logger.error({ error, stack: error.stack }, LOG_TAG);
    const output = error.output;
    return response.status(output.statusCode).set(output.headers).json(output.payload);
  });

  return app;
}
