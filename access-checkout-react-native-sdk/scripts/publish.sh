#!/bin/bash

invalidArgumentsMessage="Invalid arguments \n
Usage: \n
publish -d|--destination=[local|staging|prod]
\n\n
local will publish to http://localhost:4873\n
staging will publish to https://hydra-014399089400.d.codeartifact.eu-west-1.amazonaws.com/npm/access-checkout-react-native/\n
prod will publish to https://registry.npmjs.org\n
\n
\n
Also to publish manually to staging, prior to running this script, make sure that you have authenticated on aws-vault using 'aws-vault exec gw2dev-sso'\n
"

for i in "$@"
do
case $i in
    -d=*|--destination=*)
    destination="${i#*=}"
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

if [ "${destination}" == "local" ]; then
  registryAddress="http://localhost:4873"
elif [ "${destination}" == "staging" ]; then
  registryAddress="https://hydra-014399089400.d.codeartifact.eu-west-1.amazonaws.com/npm/access-checkout-react-native/"
elif [ "${destination}" == "prod" ]; then
  registryAddress="https://registry.npmjs.org"
fi

if [ -z "${registryAddress}"  ]; then
  echo -e "Registry address is empty, it looks like destination has not been correctly specified \n"
  echo -e $invalidArgumentsMessage
  exit 1
fi

sdkVersion="$(jq -r '.version' ./package.json)"
if ! [[ "${sdkVersion}" =~ ^([0-9]+)\.([0-9]+)\.([0-9]+)$ ]]; then
  echo "Failed to find version in format x.y.z (instead found '${sdkVersion}')"
  exit 1
fi

androidBridgeVersion=$(cat android/gradle.properties | grep -m 1 'version=' | sed 's/version=//')
mavenLocalPublicationOutputPath=~/.m2/repository/com/worldpay/access/access-checkout-react-native-sdk-android-bridge/${androidBridgeVersion}
androidBridgePublishPath=./com/worldpay/access/access-checkout-react-native-sdk-android-bridge/${androidBridgeVersion}

cd android
echo "Deleting Android Bridge Artifacts from publish folder and from local .m2 directory"
rm -Rf com $mavenLocalPublicationOutputPath/*
if [ $? -ne 0 ]; then
  echo "Failed. Stopping publish process and exiting now"
  exit 1
fi

echo "Publishing Android Bridge ${androidBridgeVersion} Artifacts to Maven Local"
./gradlew publishReleasePublicationToMavenLocal
if [ $? -ne 0 ]; then
  echo "Failed. Stopping publish process and exiting now"
  exit 1
fi

echo "Creating Android Bridge Artifacts destination folder '${androidBridgePublishPath}'"
mkdir -p ${androidBridgePublishPath}
if [ $? -ne 0 ]; then
  echo "Failed. Stopping publish process and exiting now"
  exit 1
fi

androidBridgeAarPath="${mavenLocalPublicationOutputPath}/access-checkout-react-native-sdk-android-bridge-${androidBridgeVersion}.aar"
echo $androidBridgeAarPath
if ! [[ -f "${androidBridgeAarPath}" ]]; then
    echo "Failed to find Android Bridge aar file at ${androidBridgeAarPath}"
    exit 1
fi

androidBridgePomPath="${mavenLocalPublicationOutputPath}/access-checkout-react-native-sdk-android-bridge-${androidBridgeVersion}.pom"
if ! [[ -f "${androidBridgePomPath}" ]]; then
    echo "Failed to find Android Bridge pom file at ${androidBridgePomPath}"
    exit 1
fi

androidBridgeModulePath="${mavenLocalPublicationOutputPath}/access-checkout-react-native-sdk-android-bridge-${androidBridgeVersion}.module"
if ! [[ -f "${androidBridgeModulePath}" ]]; then
    echo "Failed to find Android Bridge module file at ${androidBridgeModulePath}"
    exit 1
fi

echo "Moving the following files from local .m2 directory into the newly created '${androidBridgePublishPath}' folder"
ls -1 $mavenLocalPublicationOutputPath
mv $mavenLocalPublicationOutputPath/* ${androidBridgePublishPath}
if [ $? -ne 0 ]; then
  echo "Failed. Stopping publish process and exiting now"
  exit 1
fi

if [ "${destination}" == "staging" ]; then
  echo "Logging in to Codeartifact registry at ${registryAddress} "

  aws codeartifact login --tool npm --repository access-checkout-react-native --domain hydra --domain-owner 014399089400

  if [ $? -ne 0 ]; then
    echo "Failed to login to codeartifact. Have you authenticated on aws-vault using 'aws-vault exec gw2dev-sso' ?"
    echo "Stopping publish process and exiting now"
    exit 1
  fi
fi

echo "Publishing React Native SDK ${sdkVersion} to ${registryAddress}"
cd ..
if [ "${destination}" != "prod" ]; then
  npm publish --registry $registryAddress
else
  npm publish --registry $registryAddress --dry-run
fi
if [ $? -ne 0 ]; then
  echo "Failed. Stopping publish process and exiting now"
  exit 1
fi

