echo "Deleting any existing test reports"
rm -f ./reports/e2e-tests/android.html
rm -f ./reports/e2e-tests/ios.html

echo "Running e2e tests for Android"
echo ""

JEST_HTML_REPORTER_OUTPUT_PATH="./reports/e2e-tests/android.html" detox test --configuration android --loglevel verbose

echo "Running e2e tests for iOS"
echo ""

JEST_HTML_REPORTER_OUTPUT_PATH="./reports/e2e-tests/ios.html" detox test --configuration ios --loglevel verbose
