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

# Making sure we are in the access-checkout-react-native-sdk directory
currentDirectory=$(basename $(pwd))
if [ "${currentDirectory}" != "access-checkout-react-native-sdk" ]; then
  echo "This script must be run from the 'access-checkout-react-native-sdk' directory"
  exit 1
fi

# Extracting arguments
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
    exit 1
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

if [ -z "${registryAddress}" ]; then
  echo -e "Registry address is empty, it looks like destination has not been correctly specified \n"
  echo -e $invalidArgumentsMessage
  exit 1
fi

# Checking version is present and in correct format
sdkVersion="$(jq -r '.version' ./package.json)"
if ! [[ "${sdkVersion}" =~ ^([0-9]+)\.([0-9]+)\.([0-9]+)$ ]]; then
  echo "Failed to find version in format x.y.z (instead found '${sdkVersion}')"
  exit 1
fi

# Installing NPM dependencies (required by Gradle)
npm install

# Regenerate all lib files and ensure that there are no differences with what is in the repo
npm run prepare

numberFilesChanged=$(git status lib --porcelain | wc -l)
if [ $numberFilesChanged -ne 0 ]; then
  echo "Some of the files in 'lib' are different from what is in the repo. Please check. Stopping publish process and exiting now"
  exit 1
fi

artifactName="access-checkout-react-native-sdk-android-bridge"
androidBridgeVersion=$(cat android/gradle.properties | grep -m 1 'version=' | sed 's/version=//')
androidBridgePublishPath=./com/worldpay/access/${artifactName}/${androidBridgeVersion}
androidBridgePublishPathWithoutVersion=./com/worldpay/access/${artifactName}
mavenLocalPublicationOutputPath=~/.m2/repository/com/worldpay/access/${artifactName}/${androidBridgeVersion}
mavenLocalPublicationXmlMetadataPath=~/.m2/repository/com/worldpay/access/${artifactName}/maven-metadata-local.xml

cd android
echo "Deleting Android Bridge Artifacts from publish folder and from local .m2 directory"
rm -Rf com $mavenLocalPublicationOutputPath $mavenLocalPublicationXmlMetadataPath
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

mavenLocalAarPath="${mavenLocalPublicationOutputPath}/${artifactName}-${androidBridgeVersion}.aar"
echo $mavenLocalAarPath
if ! [[ -f "${mavenLocalAarPath}" ]]; then
    echo "Failed to find Android Bridge aar file at ${mavenLocalAarPath}"
    exit 1
fi

mavenLocalPomPath="${mavenLocalPublicationOutputPath}/${artifactName}-${androidBridgeVersion}.pom"
if ! [[ -f "${mavenLocalPomPath}" ]]; then
    echo "Failed to find Android Bridge pom file at ${mavenLocalPomPath}"
    exit 1
fi

mavenLocalModulePath="${mavenLocalPublicationOutputPath}/${artifactName}-${androidBridgeVersion}.module"
if ! [[ -f "${mavenLocalModulePath}" ]]; then
    echo "Failed to find Android Bridge module file at ${mavenLocalModulePath}"
    exit 1
fi

if ! [[ -f ${mavenLocalPublicationXmlMetadataPath} ]]; then
    echo "Failed to find Making metadata XML file at ${mavenLocalPublicationXmlMetadataPath}"
    exit 1
fi

echo "Moving the following files from local .m2 directory into the newly created '${androidBridgePublishPath}' folder"
ls -1 $mavenLocalPublicationOutputPath
mv $mavenLocalPublicationOutputPath/* ${androidBridgePublishPath}
if [ $? -ne 0 ]; then
  echo "Failed. Stopping publish process and exiting now"
  exit 1
fi

echo "Moving 'maven-metadata-local.xml' file from local .m2 directory to '${androidBridgePublishPathWithoutVersion}' folder and renaming it 'maven-metadata.xml'"
mv ${mavenLocalPublicationXmlMetadataPath} ${androidBridgePublishPathWithoutVersion}/maven-metadata.xml
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
  publishStatusCode=$?

  echo "Resetting registry to default NPM registry"
  npm config delete registry
else
  npm publish --registry $registryAddress --access public
  publishStatusCode=$?
fi

if [ $publishStatusCode -ne 0 ]; then
  echo "Failed to publish SDK, status code was ${publishStatusCode}"
  exit 1
fi

