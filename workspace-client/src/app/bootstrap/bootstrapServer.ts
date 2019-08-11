import { Registry } from 'app/bootstrap/registry';
import bodyParser from 'body-parser';
import Boom from 'boom';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import favicon from 'serve-favicon';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import TokenUtils from 'app/utils/TokenUtils';
import jwt from 'jsonwebtoken';

const LOG_TAG = 'app';
const BUILD_PATH = '../../../client/build';
const ASSET_PATHS = JSON.parse(fs.readFileSync(path.join(__dirname, BUILD_PATH, '/static/assets.json'), 'utf8'));

const NODE_ENV = process.env.NODE_ENV || 'development';

export default function(registry: Registry) {
  const {
    logger
  } = registry;

  const APP_BASE_PATH = process.env.APP_BASE_PATH ? process.env.APP_BASE_PATH : '';

  logger.debug('\n>>> BOOTSTRAPPING APP <<<<\n', LOG_TAG);

  const app = express();

  app.use(favicon(path.join(__dirname, BUILD_PATH + '/favicon.ico')));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use('/static', express.static(path.join(__dirname, BUILD_PATH + '/static')));
  app.use(morgan(NODE_ENV === 'development' ? 'dev' : 'combined'));

  app.get('/health', (_request, response) => {
    return response.json({ ok: true });
  });

  app.get('*', (request, response, next) => {
    const accessToken = TokenUtils.parseAuthorizationHeader(request.headers.authorization) || '';
    const accessTokenPayload = jwt.decode(accessToken);
    // TODO: Better type here for the payload.
    const csrfToken = accessTokenPayload && (accessTokenPayload as any).csrfToken;
    var env = JSON.stringify({
      NODE_ENV,
      LOG_LEVEL: process.env.LOG_LEVEL,
      CSRF_TOKEN: csrfToken
    })
    // TODO: Replace with a proper templating system
    fs.readFile(path.join(__dirname, BUILD_PATH, 'index.html'), 'utf8', (error, file) => {
      if (error) return next(error);
      if (!file) return next();
      file = ASSET_PATHS.main.css ? file.replace('__STYLE_PATH__', `${APP_BASE_PATH}/static/${ASSET_PATHS.main.css}`) : file.replace('<link rel="stylesheet" type="text/css" href="__STYLE_PATH__">', '');
      file = file.replace('__INITIAL_STATE={}', `__INITIAL_STATE=${JSON.stringify({ currentUser: {} })}`);
      file = file.replace('{%ENV%}', `var ENV={NODE_ENV: '${NODE_ENV}', LOG_LEVEL: '${process.env.LOG_LEVEL}', 'CSRF_TOKEN':'${csrfToken}', 'APP_BASE_PATH':'${APP_BASE_PATH ? APP_BASE_PATH : ""}'}`);
      file = file.replace('{%ENV%}', `var ENV = '${env}'`);
      file = file.replace('__APP_PATH__', `${APP_BASE_PATH}/static/${ASSET_PATHS.main.js}`);
      response.set('Content-Type', 'text/html');
      return response.send(file);
    });
  });

  app.use((_request, _response) => {
    throw Boom.notFound();
  });
  
  app.use((error: Boom, _request: Request, response: Response, _next: any) => {
    console.log('HERE');
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
