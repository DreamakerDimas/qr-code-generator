#!/usr/bin/env bash

#################################
## Run application in DEV mode ##
#################################


started_at=$(date +"%s")

echo "-----> Provisioning containers"
docker-compose --file docker-compose.yaml up -d
echo ""

# Get container
web=$(docker-compose --file docker-compose.yaml ps -q server-nest) 

# Run Typeorm migrations.
echo "-----> Running application migrations"
docker exec -it "$web" typeorm migration:run
echo ""

ended_at=$(date +"%s")

minutes=$(((ended_at - started_at) / 60))
seconds=$(((ended_at - started_at) % 60))

echo "-----> Done in ${minutes}m${seconds}s"