FROM node:8.16.0-jessie AS base
ENV APP_HOME /usr/src/app/
ENV PROD_DEPS /usr/src/deps/prod/
RUN useradd -ms /bin/bash docker

FROM base AS build
COPY --chown=docker:docker package.json package-lock.json $PROD_DEPS
COPY --chown=docker:docker client/package.json client/package-lock.json $PROD_DEPS/client/
WORKDIR $PROD_DEPS
RUN npm ci --production
WORKDIR $PROD_DEPS/client
RUN npm ci --production

COPY --chown=docker:docker package.json package-lock.json $APP_HOME
WORKDIR $APP_HOME
RUN npm ci

COPY --chown=docker:docker src $APP_HOME/src/

COPY --chown=docker:docker client/package.json client/package-lock.json $APP_HOME/client/
COPY --chown=docker:docker client/bsconfig.json $APP_HOME/client/bsconfig.json
COPY --chown=docker:docker client/webpack.config.js $APP_HOME/client/webpack.config.js
COPY --chown=docker:docker client/src $APP_HOME/client/src/
WORKDIR $APP_HOME/client
RUN npm ci
RUN npm run build
RUN npm run webpack:production

FROM build as test
# TODO: Install cypress deps

COPY --chown=docker:docker cypress.json $APP_HOME/
COPY --chown=docker:docker cypress $APP_HOME/

FROM base as release
COPY --from=build --chown=docker:docker $PROD_DEPS/node_modules $APP_HOME/node_modules/
COPY --from=build --chown=docker:docker $PROD_DEPS/client/node_modules $APP_HOME/client/node_modules/
COPY --from=build --chown=docker:docker $APP_HOME/client/build $APP_HOME/client/build/
COPY --from=build --chown=docker:docker $APP_HOME/src $APP_HOME/src
COPY --from=build --chown=docker:docker $APP_HOME/package.json $APP_HOME/package.json

USER docker

WORKDIR $APP_HOME