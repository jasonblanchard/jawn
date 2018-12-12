#!/bin/bash

docker-compose -f docker-compose.ci.yml up -d
docker-compose -f docker-compose.ci.yml run tests bash -c "cd /home/app/tests && npm run cypress:run"
docker-compose -f docker-compose.ci.yml exec -T app bash -c "cd /home/app/webapp/client && npm run test"
docker-compose -f docker-compose.ci.yml down
