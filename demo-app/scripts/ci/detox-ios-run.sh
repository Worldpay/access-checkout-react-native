#!/bin/bash

# This script must be executed from the demo-app folder

set +e
echo "Listing devices using applesimutils"
applesimutils --list

echo "Listing devices using xcrun"
xcrun simctl list devicetypes

echo "Deleting any existing test reports"
rm -f ./reports/e2e-tests/ios-e2e-tests.html

./scripts/start-react-native-background.sh

echo "Deleting any detox lock file"
filePathToDelete=~/.local/share/Detox/device.registry.state.lock
if test -f "${filePathToDelete}"; then
    echo "Deleting ${filePathToDelete}"
    rm -f $filePathToDelete
fi

filePathToDelete=~/Library/Detox/device.registry.state.lock
if test -f "${filePathToDelete}"; then
    echo "Deleting ${filePathToDelete}"
    rm -f $filePathToDelete
fi


echo "Running Detox tests for iOS"
JEST_HTML_REPORTER_OUTPUT_PATH="./reports/e2e-tests/ios-e2e-tests.html" detox test --configuration ios-ci --cleanup --loglevel trace --maxWorkers 5
status=$?

./scripts/stop-react-native-background.sh

if [ $status -ne 0 ]; then
  exit $status
fi
