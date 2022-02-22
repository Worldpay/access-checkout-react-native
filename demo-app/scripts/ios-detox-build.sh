#!/bin/bash

invalidArgumentsMessage="Invalid arguments \n
Usage: \n
ios-detox-build -v=<ios-version>
\n\n
<ios-version> the version of iOS for which to build\n
"

for i in "$@"
do
case $i in
    -v=*|--version=*)
    version="${i#*=}"
    shift
    ;;
    *)
    echo "Unknonwn option $i \n"
    echo $invalidArgumentsMessage
    exit 2
    # unknown option
    ;;
esac
done

# The . ./.. notation executes the script under the current shell instead of loading another one
# This is so that the script below can set env variables into this script

if [ -z "${version}"  ]; then
  . ./scripts/ios-find-simulator.sh
else
  . ./scripts/ios-find-simulator.sh -v=$version
fi

if [ -z "${SIMULATOR_ID}"  ]; then
  echo -e "Failed to find a simulator for iOS version ${version}, please register one\n"
  exit 1
fi

echo "Building for detox using simulator that was found"
xcodebuild -workspace ios/AccessCheckoutReactNativeDemo.xcworkspace \
-configuration Debug \
-scheme AccessCheckoutReactNativeDemo \
-sdk iphonesimulator \
-destination id=${SIMULATOR_ID} \
-derivedDataPath ios/build


