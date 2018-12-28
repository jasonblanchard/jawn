#!/bin/bash

set -e

eval $(docker-machine env linode)
TAG=$1

# TODO: Move to provision.sh
# docker stack deploy --compose-file docker-compose.yml jawnapp

docker service update --image $TAG jawnapp_app
