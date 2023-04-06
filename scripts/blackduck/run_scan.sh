#!/bin/bash

echo "Initiating Blackduck Scan..."
cd access-checkout-react-native-sdk
SDK_VERSION=$(sed -e 's/^"//' -e 's/"$//' <<< $(jq '.version' package.json))
ANDROID_BRIDGE_VERSION=$(cat android/gradle.properties | grep -m 1 'version=' | sed 's/version=//')
ANDROID_BRIDGE_GRADLE_CONFIGURATIONS_TO_SCAN="mainReleaseCompileClasspath,mainReleaseRuntimeClasspath"
IOS_BRIDGE_VERSION=$(cat ios/AccessCheckoutReactNativeSDKiOSBridge.podspec | grep -m 1 's.version' | sed -e 's/\ //g' -e 's/s\.version=//' -e 's/\"//g')

# This environment variable is used by the detect script to download a fixed version
export DETECT_LATEST_RELEASE_VERSION=$BLACKDUCK_DETECT_VERSION
curl -LOk https://detect.synopsys.com/detect8.sh
mv  detect8.sh ./detect.sh
chmod +x ./detect.sh

if [ $IS_RELEASE_SCAN -eq 1 ]
then
  echo "Executing Release Scan with name [version]-RELEASE"
  SDK_VERSION="${SDK_VERSION}-RELEASE"
  ANDROID_BRIDGE_VERSION="${ANDROID_BRIDGE_VERSION}-RELEASE"
  IOS_BRIDGE_VERSION="${IOS_BRIDGE_VERSION}-RELEASE"
fi

./detect.sh --blackduck.url="https://fis2.app.blackduck.com/" --blackduck.api.token=$hydra_aco_blackduck_token --blackduck.trust.cert=true --detect.project.name=$BLACKDUCK_PROJECT_NAME_RN --detect.project.version.name=$SDK_VERSION --detect.risk.report.pdf=true --detect.npm.include.dev.dependencies=false --detect.excluded.directories=android,ios
./detect.sh --blackduck.url="https://fis2.app.blackduck.com/" --blackduck.api.token=$hydra_aco_blackduck_token --blackduck.trust.cert=true --detect.project.name=$BLACKDUCK_PROJECT_NAME_ANDROID_BRIDGE --detect.project.version.name=$ANDROID_BRIDGE_VERSION --detect.risk.report.pdf=true --detect.source.path=android --detect.gradle.included.configurations="$ANDROID_BRIDGE_GRADLE_CONFIGURATIONS_TO_SCAN"
./detect.sh --blackduck.url="https://fis2.app.blackduck.com/" --blackduck.api.token=$hydra_aco_blackduck_token --blackduck.trust.cert=true --detect.project.name=$BLACKDUCK_PROJECT_NAME_IOS_BRIDGE --detect.project.version.name=$IOS_BRIDGE_VERSION --detect.risk.report.pdf=true --detect.source.path=ios
