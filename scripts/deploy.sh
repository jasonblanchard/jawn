#!/bin/bash

set -e

eval $(docker-machine env linode)

# TODO: Move to provision.sh
# docker stack deploy --compose-file docker-compose.yml jawnapp

# TODO: Get <tag> from args
docker service update --image <tag> jawnapp_app
