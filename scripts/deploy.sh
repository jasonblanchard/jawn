#!/bin/bash

set -e

eval $(docker-machine env linode)
TAG=$1

TAG="${TAG}" docker stack deploy --compose-file docker-compose.prod.yml --with-registry-auth jawnapp

eval $(docker-machine env -u)