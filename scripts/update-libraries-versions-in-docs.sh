#!/bin/bash

help="Invalid arguments \n
Usage: update-libraries-versions-in-docs.sh
"

  # Extracting versions of react-native and react from the SDK's package.json file
  reactNativeVersion=$(grep -m 1 '"react-native".*\d' ./access-checkout-react-native-sdk/package.json | grep -o '\d\+\.\d\+\.\d\+')
  reactVersion=$(grep -m 1 '"react"' ./access-checkout-react-native-sdk/package.json | grep -o '\d\+\.\d\+\.\d\+')

if [ -z "${reactNativeVersion}" ]; then
  echo "React Native version could not be found in package.json"
  exit 1
elif [ -z "${reactVersion}" ]; then
  echo "React version could not be found in package.json"
  exit 1
fi

echo "Updating README files with React Native version ${reactNativeVersion} and React version ${reactVersion}"

filepath=./README.md
sed -i '' "s/React [0-9]\{1,2\}.[0-9]\{1,2\}.[0-9]\{1,2\}/React ${reactVersion}/" $filepath
if [ $? -ne 0 ]; then
  echo "Failed to update React version in ${filepath}"
  exit 1
fi

sed -i '' "s/React Native [0-9]\{1,2\}.[0-9]\{1,2\}.[0-9]\{1,2\}/React Native ${reactNativeVersion}/" $filepath
if [ $? -ne 0 ]; then
  echo "Failed to update React Native version in ${filepath}"
  exit 1
fi

echo "√ Successfully processed file ${filepath}"

#
filepath=./access-checkout-react-native-sdk/README.md
sed -i '' "s/React [0-9]\{1,2\}.[0-9]\{1,2\}.[0-9]\{1,2\}/React ${reactVersion}/" $filepath
if [ $? -ne 0 ]; then
  echo "Failed to update React version in ${filepath}"
  exit 1
fi

sed -i '' "s/React Native [0-9]\{1,2\}.[0-9]\{1,2\}.[0-9]\{1,2\}/React Native ${reactNativeVersion}/" $filepath
if [ $? -ne 0 ]; then
  echo "Failed to update React Native version in ${filepath}"
  exit 1
fi

echo "√ Successfully processed file ${filepath}"
