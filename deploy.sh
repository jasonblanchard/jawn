#!/bin/bash

set -o errtrace
set -o errexit

# NOTE: This needs to happen prior to the trap statements or weird stuff happens
[ -s "$NVM_DIR/nvm.sh" ] && . $NVM_DIR/nvm.sh # Load nvm
nvm use

# TODO: Remove, I don't think these are necessary now
# npm install
# npm run build-all-production

docker-compose build app
docker-compose push app

eval $(docker-machine env linode)

docker stack deploy --compose-file docker-compose.yml jawnapp
