#!/bin/bash

rm -f ~/.npmrc

if [[ -f ~/.npmrc ]]; then
  echo "Failed to remove ~/.npmrc file. Exiting with error"
  exit 1
else
  echo "Successfully removed ~/.npmrc file."
fi
