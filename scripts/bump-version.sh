#!/bin/bash

help="\nUsage: bump-version.sh -v=<version -t=<rally_ticket_number>\n"

for i in "$@"
do
case $i in
    -v=*|--version=*)
    version="${i#*=}"
    shift
    ;;
    -t=*|--ticket=*)
    rally_ticket_number="${i#*=}"
    shift
    ;;
    *)
    echo "Unknown option $i \n"
    echo $help
    exit 2
    # unknown option
    ;;
esac
done

function trimVersion() {
  trim=$(sed 's/^[[:space:]]*//' <<< "$version")
  version=$(sed 's/[[:space:]]*$//' <<< "$trim")
}

function trimTicketNumber() {
  trim=$(sed 's/^[[:space:]]*//' <<< "$rally_ticket_number")
  rally_ticket_number=$(sed 's/[[:space:]]*$//' <<< "$trim")
}

function validateArguments() {
  if [ -z "${version}"  ]; then
    echo "Version must be specified"
    echo -e $help
    exit 1
  elif [ -z "${rally_ticket_number}"  ]; then
    echo "Ticket number must be specified"
    echo -e $help
    exit 1
  elif ! [[ "${version}" =~ ^[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}$ ]]; then
    echo "Version has incorrect format, must be x.y.z"
    echo -e $help
    exit 1
  elif ! [[ "${rally_ticket_number}" =~ ^US[0-9]{6,7}$ ]]; then
    echo "Ticket number has incorrect format, must be USxxxxxxx"
    echo -e $help
    exit 1
  fi
}

checkVersionsOfReactAndReactNativeMatch() {
  # Extracting versions of react-native and react from the SDK's package.json file
  reactNativeVersion=$(grep -m 1 '"react-native".*[0-9]' ./access-checkout-react-native-sdk/package.json | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')
  reactVersion=$(grep -m 1 '"react"' ./access-checkout-react-native-sdk/package.json | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')

  echo ""

  if [ -z "${reactNativeVersion}" ]; then
    echo "React Native version could not be found in package.json"
    exit 1
  elif [ -z "${reactVersion}" ]; then
    echo "React version could not be found in package.json"
    exit 1
  fi

  echo "Versions found in package.json: react=${reactVersion}, react-native=${reactNativeVersion}"

  # checking that versions in README.md file match up with versions supported by our SDK
  filepath=./README.md
  result=$(grep -o "React Native ${reactNativeVersion}" $filepath)
  if [ -z "${result}" ]; then
    echo "React Native version supported by our SDK  (${reactNativeVersion}) could not be found in ${filepath}. Please update the file so the version specified is the same as the one specified in the SDK package.json file"
    exit 1
  fi

  result=$(grep -o "React ${reactVersion}" $filepath)
  if [ -z "${result}" ]; then
    echo "React version specified in package.json (${reactVersion}) could not be found in ${filepath}. Please update the file so the version specified is the same as the one specified in the SDK package.json file"
    exit 1
  fi

  echo "√ React Native & React versions specified in ${filepath} match versions supported by the SDK"

  # checking that versions in ./access-checkout-react-native-sdk/README.md file match up with versions supported by our SDK
  # ./access-checkout-react-native-sdk/README.md is the content that merchants can see on the NPM page of our SDK so it is
  # critical that the version is correctly specified
  filepath=./access-checkout-react-native-sdk/README.md
  result=$(grep -o "React Native ${reactNativeVersion}" $filepath)
  if [ -z "${result}" ]; then
    echo "React Native version supported by our SDK  (${reactNativeVersion}) could not be found in ${filepath}. Please update the file so the version specified is the same as the one specified in the SDK package.json file"
    exit 1
  fi

  result=$(grep -o "React ${reactVersion}" $filepath)
  if [ -z "${result}" ]; then
    echo "React version specified in package.json (${reactVersion}) could not be found in ${filepath}. Please update the file so the version specified is the same as the one specified in the SDK package.json file"
    exit 1
  fi

  echo "√ React Native & React versions specified in ${filepath} match versions supported by the SDK"
}

checkNoPendingChangesToCommit() {
  local errorMessage=$1

  echo ""
  echo "Checking that there are no pending changes to commit"
  git diff --exit-code > /dev/null
  workingDirectoryCheckExitCode=$?

  git diff --cached --exit-code > /dev/null
  stagingAreaCheckExitCode=$?

  numberOfUnTrackedFiles=$(git ls-files . --exclude-standard --others | grep -c ".*")

  if [[ $workingDirectoryCheckExitCode -eq 1 || $stagingAreaCheckExitCode -eq 1  || numberOfUnTrackedFiles -ne 0 ]]; then
    echo $errorMessage
    exit 1
  fi
}

pullLatestChangesFromMaster() {
  echo ""
  echo "Checking out master"
  git checkout master

  if [[ $? -ne 0 ]]; then
    echo "Failed to checkout master branch"
    exit 1
  fi

  echo "Pulling latest changes"
  git pull

  if [[ $? -ne 0 ]]; then
    echo "Failed to pull latest changes"
    exit 1
  fi
}

createBranchOffMaster() {
  local branchName="${rally_ticket_number}-bump-version-to-${version}"

  echo ""
  echo "Creating new branch '${branchName}'"

  git checkout -b $branchName

  if [[ $? -ne 0 ]]; then
    echo "Failed to create new branch"
    exit 1
  fi
}

changeVersionInTypeScriptSDK() {
  local newVersion=$1

  echo ""
  echo "Changing version to ${version} in TypeScript SDK"

  filepath=./access-checkout-react-native-sdk/package.json
  sed -i '/"version"/s/[0-9]\{1,2\}.[0-9]\{1,2\}.[0-9]\{1,2\}/'"$newVersion"'/' $filepath
  status=$?
  if [ $status -ne 0 ]; then
    exit $status
  fi
  echo "Processed file ${filepath}"

  filepath=./access-checkout-react-native-sdk/package-lock.json
  sed -i '/access-worldpay-checkout-react-native-sdk/,/"version"/s/[0-9]\{1,2\}.[0-9]\{1,2\}.[0-9]\{1,2\}/'"$newVersion"'/' $filepath
  status=$?
  if [ $status -ne 0 ]; then
    exit $status
  fi
  echo "Processed file ${filepath}"

  filepath=./access-checkout-react-native-sdk/src/AccessCheckout.tsx
  sed -i '/ReactNativeSdkVersion/s/[0-9]\{1,2\}.[0-9]\{1,2\}.[0-9]\{1,2\}/'"$newVersion"'/' $filepath
  status=$?
  if [ $status -ne 0 ]; then
    exit $status
  fi
  echo "Processed file ${filepath}"
}

changeVersionInIosBridge() {
  local newVersion=$1

  echo ""
  echo "Changing version to ${version} in iOS Bridge"

  filepath=./access-checkout-react-native-sdk/ios/AccessCheckoutReactNativeSDKiOSBridge.podspec
  sed -i '/s.version/s/[0-9]\{1,2\}.[0-9]\{1,2\}.[0-9]\{1,2\}/'"$newVersion"'/' $filepath
  status=$?
  if [ $status -ne 0 ]; then
    exit $status
  fi
  echo "Processed file ${filepath}"
}

changeVersionInAndroidBridge() {
  local newVersion=$1

  echo ""
  echo "Changing version to ${version} in Android bridge"

  filepath=./access-checkout-react-native-sdk/android/access-checkout-react-native-sdk-android-bridge/gradle.properties
  sed -i '/version=/s/[0-9]\{1,2\}.[0-9]\{1,2\}.[0-9]\{1,2\}/'"$newVersion"'/' $filepath
  status=$?
  if [ $status -ne 0 ]; then
    exit $status
  fi
  echo "Processed file ${filepath}"
}

regenerateLibFiles() {
  echo ""
  echo "Regenerating lib files so they contain the new version"

  cd access-checkout-react-native-sdk
  npm run prepare

  if [ $? -ne 0 ]; then
    echo "Failed to regenerate lib files"
    exit $status
  fi

  cd ..
}

function reinstallDemoAppPods() {
  echo ""
  echo "Re-installing pods in demo-app following to version change in SDK iOS Bridge"
  cd demo-app/ios
  pod install

  status=$?

  cd ../..

  if [ $status -ne 0 ]; then
    echo "Failed to install Pods on demo-app"
    exit $status
  fi
}

commitAllChanges() {
  local commitMessage="${rally_ticket_number}: bump version to ${version}"

  echo ""
  echo "Committing changes"

  git add ./access-checkout-react-native-sdk/android/access-checkout-react-native-sdk-android-bridge/gradle.properties
  git add ./access-checkout-react-native-sdk/ios/AccessCheckoutReactNativeSDKiOSBridge.podspec
  git add ./access-checkout-react-native-sdk/package-lock.json
  git add ./access-checkout-react-native-sdk/package.json
  git add ./access-checkout-react-native-sdk/src/AccessCheckout.tsx
  git add ./demo-app/ios/Podfile.lock
  git add ./access-checkout-react-native-sdk/lib/
  git add ./README.md
  git add ./access-checkout-react-native-sdk/README.md

  git commit -m "$commitMessage"

  if [[ $? -ne 0 ]]; then
    echo "Failed to commit changes"
    exit 1
  fi
}

pushChanges() {
  local branchName="${rally_ticket_number}-bump-version-to-${version}"

  echo ""
  echo "Pushing branch '${branchName}' to remote"

  git push --set-upstream origin $branchName

  if [[ $? -ne 0 ]]; then
    echo "Failed to push changes to remote"
    exit 1
  fi
}

changeVersionInReadme() {
  echo ""

  sh ./scripts/update-libraries-versions-in-docs.sh

  if [[ $? -ne 0 ]]; then
    echo "Failed to change version in readme files"
    exit 1
  fi
}

trimVersion
trimTicketNumber
validateArguments
checkVersionsOfReactAndReactNativeMatch
checkNoPendingChangesToCommit "Please run git reset --hard HEAD to clean your working directory and staging area"
pullLatestChangesFromMaster
createBranchOffMaster

changeVersionInTypeScriptSDK $version
changeVersionInIosBridge $version
changeVersionInAndroidBridge $version
changeVersionInReadme
reinstallDemoAppPods
regenerateLibFiles

commitAllChanges
checkNoPendingChangesToCommit "Some changes have been left out and not committed. This is unexpected and is an issue. Please check the script"
pushChanges
