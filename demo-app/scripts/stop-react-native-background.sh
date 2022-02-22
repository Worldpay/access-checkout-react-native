#!/bin/bash

port=8081

pid=$(lsof -ti:${port})

if [ -n "$pid" ]; then
  kill $pid
  status=$?

  if [ "$status" -eq  0 ]; then
    echo "React native server stopped successfully"
  else
    echo "Failed to stop React native server"
    exit $status
  fi
fi
