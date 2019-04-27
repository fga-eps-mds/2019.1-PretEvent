#!/bin/bash

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push pretevent/pretevent:app
docker push pretevent/pretevent:web1
docker push pretevent/pretevent:web2
docker push pretevent/pretevent:web3
