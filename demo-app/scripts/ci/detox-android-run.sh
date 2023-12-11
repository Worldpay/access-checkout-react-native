#!/bin/bash

# This script must be executed from the demo-app folder

set +e

./scripts/start-react-native-background.sh

echo "Running Detox tests"

# We do not use the --cleanup option because Detox already stops the Android device at the end of the tests in BitRise
# Passing the --cleanup flag causes an error where Detox attempts to stop the device twice hence failing the test task
JEST_HTML_REPORTER_OUTPUT_PATH="./reports/e2e-tests/android-e2e-tests.html" detox test --configuration android-ci --loglevel trace --record-videos all --take-screenshots all --record-logs failing
status=$?

./scripts/stop-react-native-background.sh

if [ $status -ne 0 ]; then
  exit $status
fi
