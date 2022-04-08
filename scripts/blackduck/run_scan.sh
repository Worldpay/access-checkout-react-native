#!/bin/bash

echo "Initiating Blackduck Scan..."
cd access-checkout-react-native-sdk
androidBridgeVersion=$(cat android/gradle.properties | grep -m 1 'version=' | sed 's/version=//')
iosBridgeVersion=$(cat ios/AccessCheckoutReactNativeSDKiOSBridge.podspec | grep -m 1 's.version' | sed -e 's/\ //g' -e 's/s\.version=//' -e 's/\"//g')
if [ $IS_RELEASE_SCAN -eq 0 ]
then
  ./detect.sh --blackduck.url="https://fis2.app.blackduck.com/" --blackduck.api.token=$hydra_aco_blackduck_token --blackduck.trust.cert=true --detect.project.name=$BLACKDUCK_PROJECT_NAME_RN --detect.project.version.name=$SDK_VERSION --detect.risk.report.pdf=true --detect.npm.include.dev.dependencies=false --detect.excluded.directories=android,ios
  ./detect.sh --blackduck.url="https://fis2.app.blackduck.com/" --blackduck.api.token=$hydra_aco_blackduck_token --blackduck.trust.cert=true --detect.project.name=$BLACKDUCK_PROJECT_NAME_ANDROID_BRIDGE --detect.project.version.name=$androidBridgeVersion --detect.risk.report.pdf=true --detect.source.path=android
  ./detect.sh --blackduck.url="https://fis2.app.blackduck.com/" --blackduck.api.token=$hydra_aco_blackduck_token --blackduck.trust.cert=true --detect.project.name=$BLACKDUCK_PROJECT_NAME_IOS_BRIDGE --detect.project.version.name=$iosBridgeVersion --detect.risk.report.pdf=true --detect.source.path=ios
else
  echo "Executing Release Scan with name [version]-RELEASE"
  ./detect.sh --blackduck.url="https://fis2.app.blackduck.com/" --blackduck.api.token=$hydra_aco_blackduck_token --blackduck.trust.cert=true --detect.project.name=$BLACKDUCK_PROJECT_NAME_RN --detect.project.version.name="$SDK_VERSION-RELEASE" --detect.risk.report.pdf=true --detect.npm.include.dev.dependencies=false --detect.excluded.directories=android,ios
  ./detect.sh --blackduck.url="https://fis2.app.blackduck.com/" --blackduck.api.token=$hydra_aco_blackduck_token --blackduck.trust.cert=true --detect.project.name=$BLACKDUCK_PROJECT_NAME_ANDROID_BRIDGE --detect.project.version.name="$androidBridgeVersion-RELEASE" --detect.risk.report.pdf=true --detect.source.path=android
  ./detect.sh --blackduck.url="https://fis2.app.blackduck.com/" --blackduck.api.token=$hydra_aco_blackduck_token --blackduck.trust.cert=true --detect.project.name=$BLACKDUCK_PROJECT_NAME_IOS_BRIDGE --detect.project.version.name="$iosBridgeVersion-RELEASE" --detect.risk.report.pdf=true --detect.source.path=ios
fi
