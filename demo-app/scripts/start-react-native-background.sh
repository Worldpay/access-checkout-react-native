#!/bin/bash

echo "Starting react native server"

npm start > /dev/null 2>&1 &


counter=0
interval_in_seconds=0.5
max_attempts=40

until $(curl --output /dev/null --silent --head --fail http://localhost:8081); do
    if [ ${counter} -eq ${max_attempts} ];then
      echo "Failed to access react native server after ${max_attempts} attempts, looks like it failed to start up"
      exit 1
    fi

    counter=$(($counter+1))
    sleep $interval_in_seconds
done

echo "Started successfully."
