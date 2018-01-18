import { graphqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import Boom from 'boom';
import cookieParser from 'cookie-parser';
import express from 'express';
import expressJwt from 'express-jwt';
import favicon from 'serve-favicon';
import fs from 'fs';
import get from 'lodash.get';
import morgan from 'morgan';
import path from 'path';
import TokenUtils from 'app/utils/TokenUtils';

const LOG_TAG = 'app';
const BUILD_PATH = '../../../client/build';

const NODE_ENV = process.env.NODE_ENV || 'development';

export default function(registry) {
  const appSecret = process.env.APP_SECRET;
  const {
    graphqlService,
    logger,
    loginController,
    userService,
  } = registry;

  logger.debug('\n>>> BOOTSTRAPPING APP <<<<\n', LOG_TAG);

  const app = express();

  // TODO: Get this from somewhere else.
  app.use(favicon(path.join(__dirname, 'favicon.ico')));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use('/static', express.static(path.join(__dirname, BUILD_PATH + '/static')));
  app.use(morgan(NODE_ENV === 'development' ? 'dev' : 'combined'));
  // TODO: Include audience and issuer values?
  app.use(expressJwt({
    secret: appSecret,
    requestProperty: 'accessTokenPayload',
    getToken: request => {
      return TokenUtils.parseAuthorizationHeader(request.headers.authorization);
    },
    credentialsRequired: true,
  }).unless({
    path: ['/api/login', '/api/sign-up'],
    custom: request => {
      // Require token for all /api/* routes. Skip it for all other routes which just serve satic assets.
      // TODO: Consider doing all auth checks/redirects server-side
      return !request.originalUrl.match(/^\/api\//);
    },
  }));

  app.post('/api/login', loginController.handleLogin);
  app.post('/api/sign-up', loginController.handleSignUp);

  app.use('/api/graphql', graphqlExpress(request => graphqlService.handleRequest(request)));

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
          return response.send(file);
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
