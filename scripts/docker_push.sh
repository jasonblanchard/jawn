#!/bin/bash

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

TAG=$(git rev-parse HEAD)
IMAGE=jasonblanchard/jawn-app

docker tag $IMAGE "$IMAGE:latest"
docker tag $IMAGE "$IMAGE:$TAG"

docker push "$IMAGE:latest"
docker push "$IMAGE:$TAG"
