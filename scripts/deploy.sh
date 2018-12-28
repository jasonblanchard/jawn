#!/bin/bash

set -e

eval $(docker-machine env linode)
TAG=$1
IMAGE=jasonblanchard/jawn-app

# TODO: Move to provision.sh
# docker stack deploy --compose-file docker-compose.yml jawnapp

docker service update --image "$IMAGE:$TAG" jawnapp_app
