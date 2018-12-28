#!/bin/bash

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

TAG=git rev-parse HEAD

docker tag jasonblanchard/jawn-app latest
docker tag jasonblanchard/jawn-app "$(TAG)"

docker push jasonblanchard/jawn-app:latest
docker push "jasonblanchard/jawn-app:$(TAG)"
