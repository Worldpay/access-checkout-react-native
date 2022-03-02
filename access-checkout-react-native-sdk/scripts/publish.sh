#!/bin/bash

version="0.0.1"
mavenLocalRepository=~/.m2/repository/com/worldpay/access/access-checkout-react-native-sdk-android-bridge/$version

cd android
echo "Deleting Android Bridge Artifacts from Local .m2 directory"
rm -Rf publish $mavenLocalRepository/*
if [ $? -ne 0 ]; then
  echo "Failed to delete Android Bridge Artifacts from Local .m2 directory"
  exit 1
fi

echo "Publish Release to Maven Local"
./gradlew publishReleasePublicationToMavenLocal
if [ $? -ne 0 ]; then
  echo "Failed to publish Android Bridge Artifacts to Maven Local"
  exit 1
fi

mkdir -p publish
if [ $? -ne 0 ]; then
  echo "Failed to create 'publish' folder"
  exit 1
fi

echo "Move the following files from local .m2 directory into the newly created 'android/publish/' folder"
ls -1 $mavenLocalRepository
mv $mavenLocalRepository/* ./publish
if [ $? -ne 0 ]; then
  echo "Failed to move the following files from local .m2 directory into the newly created 'android/publish/' folder"
  exit 1
fi


