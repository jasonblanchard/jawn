FROM node:8.9.4

# Provides cached layer for node_modules
ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install
RUN mkdir -p /src/app && cp -a /tmp/node_modules /src/app

WORKDIR /src/app

ADD . /src/app

EXPOSE 8080
USER node

ENV PORT 8080
ENV NODE_PATH=./build

# Use this instead of `npm run start` for better process management within container.
CMD ["node", "build/app/index.js"]
