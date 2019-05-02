#!/bin/bash

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push pretevent/app
docker push pretevent/web1
docker push pretevent/web2
docker push pretevent/web3
