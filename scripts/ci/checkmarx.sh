#!/bin/bash

curl https://download.checkmarx.com/9.4.0_GA/Plugins/CxConsolePlugin-1.1.10.zip --output checkmarx.zip
unzip checkmarx.zip

./runCxConsole.sh Scan -v -CxServer https://worldpay.checkmarx.net -projectName "$CHECKMARX_FULL_PROJECT_PATH_RN" $CHECKMARX_PRESET -CxUser $hydra_aco_web_checkmarx_username -CxPassword $hydra_aco_web_checkmarx_password -Locationtype folder -locationpath . $CHECKMARX_EXCLUDE_FOLDERS_RN -ReportPDF checkmarx_rn.pdf -SASTMedium 0 -SASTHigh 0 -SASTLow 0 &
./runCxConsole.sh Scan -v -CxServer https://worldpay.checkmarx.net -projectName "$CHECKMARX_FULL_PROJECT_PATH_IOS_BRIDGE" $CHECKMARX_PRESET -CxUser $hydra_aco_web_checkmarx_username -CxPassword $hydra_aco_web_checkmarx_password -Locationtype folder -locationpath access-checkout-react-native-sdk/ios -ReportPDF checkmarx_rn_ios.pdf -SASTMedium 0 -SASTHigh 0 -SASTLow 0 &
./runCxConsole.sh Scan -v -CxServer https://worldpay.checkmarx.net -projectName "$CHECKMARX_FULL_PROJECT_PATH_ANDROID_BRIDGE" $CHECKMARX_PRESET -CxUser $hydra_aco_web_checkmarx_username -CxPassword $hydra_aco_web_checkmarx_password -Locationtype folder -locationpath access-checkout-react-native-sdk/android -ReportPDF checkmarx_rn_android.pdf -SASTMedium 0 -SASTHigh 0 -SASTLow 0 &
wait
