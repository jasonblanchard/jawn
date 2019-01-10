import { graphqlExpress } from 'apollo-server-express';
import { Registry } from 'app/bootstrap/registry';
import bodyParser from 'body-parser';
import Boom from 'boom';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import expressJwt from 'express-jwt';
import favicon from 'serve-favicon';
import fs from 'fs';
import get from 'lodash.get';
import morgan from 'morgan';
import path from 'path';
import TokenUtils from 'app/utils/TokenUtils';

const LOG_TAG = 'app';
const BUILD_PATH = '../../../client/build';
const ASSET_PATHS = JSON.parse(fs.readFileSync(path.join(__dirname, BUILD_PATH, '/static/assets.json'), 'utf8'));

const NODE_ENV = process.env.NODE_ENV || 'development';

export default function(registry: Registry) {
  const appSecret = process.env.APP_SECRET; // TODO: Bootstrap this separately
  const {
    graphqlService,
    logger,
    loginController,
    userService,
  } = registry;

  logger.debug('\n>>> BOOTSTRAPPING APP <<<<\n', LOG_TAG);

  const app = express();

  app.use(favicon(path.join(__dirname, BUILD_PATH + '/favicon.ico')));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use('/static', express.static(path.join(__dirname, BUILD_PATH + '/static')));
  app.use(morgan(NODE_ENV === 'development' ? 'dev' : 'combined'));
  // TODO: Include audience nd issuer values?
  app.use(expressJwt({
    secret: appSecret || '',
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

  app.get('/health', (_request, response) => {
    return response.json({ ok: true });
  });

  app.post('/api/login', loginController.handleLogin);
  app.post('/api/sign-up', loginController.handleSignUp);

  app.use('/api/graphql', graphqlExpress((request: Request) => graphqlService.handleRequest(request)));

  app.use('/api/*', (_request, _response, next) => {
    next(Boom.notFound());
  });

  app.get('*', (request, response, next) => {
    const id = get(request, 'accessTokenPayload.id');
    userService.findById(id)
      .then(user => {
        logger.debug({ user: user || {} }, LOG_TAG);

        const token = request.cookies.token;
        user = Object.assign({}, user, { token });

        // TODO: Replace with a proper templating system
        fs.readFile(path.join(__dirname, BUILD_PATH, 'index.html'), 'utf8', (error, file) => {
          if (error) return next(error);
          if (!file) return next();
          file = ASSET_PATHS.main.css ? file.replace('__STYLE_PATH__', `/static/${ASSET_PATHS.main.css}`) : file.replace('<link rel="stylesheet" type="text/css" href="__STYLE_PATH__">', '');
          file = file.replace('__INITIAL_STATE={}', `__INITIAL_STATE=${JSON.stringify({ currentUser: user })}`);
          file = file.replace('__ENV={}', `__ENV={NODE_ENV: '${NODE_ENV}', LOG_LEVEL: '${process.env.LOG_LEVEL}'}`);
          file = file.replace('__APP_PATH__', `/static/${ASSET_PATHS.main.js}`);
          response.set('Content-Type', 'text/html');
          return response.send(file);
        });
      })
      .catch((error) => {
        next(error);
      });
  });

  app.use((error: Boom, _request: Request, response: Response) => {
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
