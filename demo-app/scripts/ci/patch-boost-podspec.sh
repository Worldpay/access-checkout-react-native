#!/bin/bash

# This script is used to patch an issue during the installation of the Boost pod dependency
# See Boost issue - https://github.com/boostorg/boost/issues/843
# Temporary workaround proposed by Facebook - https://github.com/facebook/react-native/issues/42180

# replacing https://boostorg.jfrog.io/artifactory/main by https://archives.boost.io
# and creating temp file
cat ./node_modules/react-native/third-party-podspecs/boost.podspec | sed s/boostorg.jfrog.io\\/artifactory\\/main/archives.boost.io/ > node_modules/react-native/third-party-podspecs/temp

# overwrite boost.podspec file
mv node_modules/react-native/third-party-podspecs/temp node_modules/react-native/third-party-podspecs/boost.podspec
