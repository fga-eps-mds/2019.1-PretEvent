#!/bin/bash

cd /home/ubuntu/
docker stack deploy -c docker-compose-prod.yml pretevent
