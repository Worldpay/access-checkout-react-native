#!/bin/bash

invalidArgumentsMessage="Invalid arguments \n
Usage: \n
ios-find-simulator -v=<ios-version>
\n\n
<ios-version> the version of iOS for which to find a simulator\n
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

filename="simulators-list"

xcrun xctrace list devices &> temp
cat temp | grep -A 100 'Simulators' > $filename

echo "Found the following list of simulators"
cat $filename

if [ -z "${version}"  ]; then
  echo ""
  echo "No version has been passed, so the first simulator will be grabbed"
  simulator=$(cat $filename | grep -m 1 '\d\d\.\d')
else
  echo ""
  echo "Version ${version} has been passed, so the first simulator matching this version will be grabbed"

  # escapes the . character with a \ if it is present in the version string
  if [[ "$version" == *"."* ]]; then
    grepPattern="${version//./\.}"
  fi

  simulator=$(cat $filename | grep -m 1 "${grepPattern}")
fi

export SIMULATOR_VERSION=$(echo $simulator | grep -o '\d\d\.\d')
export SIMULATOR_ID=$(echo $simulator | grep -o -E '[0-9A-Z\-]{36}')
export SIMULATOR_NAME=$(echo $simulator | sed -e "s/ ($simulator_version)//"| sed -e "s/ ($simulator_id)//")

rm -f temp $filename

if [ -n "${SIMULATOR_ID}"  ]; then
  echo "Found following simulator:"
  echo "Name: '$SIMULATOR_NAME'"
  echo "Version: '$SIMULATOR_VERSION'"
  echo "ID: '$SIMULATOR_ID'"
fi
