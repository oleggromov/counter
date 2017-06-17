#!/bin/bash
source "./secrets/docker-repository.sh"
read -p 'Tag: ' TAG

docker build -t ${COUNTER_DOCKER_REPOSITORY}/counter-app:${TAG}-demo --build-arg NODE_ENV=production .
# docker build -t ${COUNTER_DOCKER_REPOSITORY}/counter-app:${TAG}-dev --build-arg NODE_ENV=development .

unset COUNTER_DOCKER_REPOSITORY
