#!/bin/bash

version="$(jq -r '.version' ./package.json)"
if ! [[ "${version}" =~ ^([0-9]+)\.([0-9]+)\.([0-9]+)$ ]]; then
  echo "Failed to find version in format x.y.z (instead found '${version}')"
  exit 1
fi

mavenLocalPublicationOutputPath=~/.m2/repository/com/worldpay/access/access-checkout-react-native-sdk-android-bridge/$version
# Used for local testing
registryAddress="http://localhost:4873"
publishFolderPath=./publish/com/worldpay/access/access-checkout-react-native-sdk-android-bridge/${version}

cd android
echo "Deleting Android Bridge Artifacts from Local .m2 directory"
rm -Rf publish $mavenLocalPublicationOutputPath/*
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

mkdir -p ${publishFolderPath}
if [ $? -ne 0 ]; then
  echo "Failed to create '${publishFolderPath}' folder"
  exit 1
fi

androidBridgeAarPath="${mavenLocalPublicationOutputPath}/access-checkout-react-native-sdk-android-bridge-${version}.aar"
echo $androidBridgeAarPath
if ! [[ -f "${androidBridgeAarPath}" ]]; then
    echo "Failed to find Android Bridge aar file at ${androidBridgeAarPath}"
    exit 1
fi

androidBridgePomPath="${mavenLocalPublicationOutputPath}/access-checkout-react-native-sdk-android-bridge-${version}.pom"
if ! [[ -f "${androidBridgePomPath}" ]]; then
    echo "Failed to find Android Bridge pom file at ${androidBridgePomPath}"
    exit 1
fi

androidBridgeModulePath="${mavenLocalPublicationOutputPath}/access-checkout-react-native-sdk-android-bridge-${version}.module"
if ! [[ -f "${androidBridgeModulePath}" ]]; then
    echo "Failed to find Android Bridge module file at ${androidBridgeModulePath}"
    exit 1
fi

echo "Move the following files from local .m2 directory into the newly created '${publishFolderPath}' folder"
ls -1 $mavenLocalPublicationOutputPath
mv $mavenLocalPublicationOutputPath/* ${publishFolderPath}
if [ $? -ne 0 ]; then
  echo "Failed to move the following files from local .m2 directory into the newly created '${publishFolderPath}' folder"
  exit 1
fi

echo "Publish React Native SDK ${version} to ${registryAddress}"
cd ..
npm publish --registry $registryAddress
if [ $? -ne 0 ]; then
  echo "Failed publish React Native SDK"
  exit 1
fi

