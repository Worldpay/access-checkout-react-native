#!/bin/bash

echo "Initiating Blackduck Scan..."

cd access-checkout-react-native-sdk
curl -LOk https://detect.synopsys.com/detect.sh
chmod +x ./detect.sh
SDK_VERSION=$(sed -e 's/^"//' -e 's/"$//' <<< $(jq '.version' package.json))
./detect.sh --blackduck.url="https://fis2.app.blackduck.com/" --blackduck.api.token=$hydra_aco_blackduck_token --blackduck.trust.cert=true --detect.project.name=$BLACKDUCK_PROJECT_NAME --detect.project.version.name=$SDK_VERSION --detect.risk.report.pdf=true --detect.npm.include.dev.dependencies=false --detect.excluded.directories=android,ios
