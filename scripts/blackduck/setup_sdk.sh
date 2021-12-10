#!/bin/bash

echo "Installing Dependancies..."
npm install

echo "Building SDK..."
npm run build -- -e=development
