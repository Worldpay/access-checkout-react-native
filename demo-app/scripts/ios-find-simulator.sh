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

if [ -z "${version}"  ]; then
  simulator=$(cat $filename | grep -A 100 'Simulators' $filename | grep -m 1 '\d\d\.\d')
else
  simulator=$(cat $filename | grep -A 100 'Simulators' $filename | grep -m 1 "${version}")
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
