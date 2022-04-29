#!/bin/bash

emulatorName="emulator"

echo "Deleting emulator $emulatorName"
avdmanager -v delete avd -n $emulatorName
