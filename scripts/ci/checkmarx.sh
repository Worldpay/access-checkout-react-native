#!/bin/bash

curl https://download.checkmarx.com/9.5.0/Plugins/CxConsolePlugin-1.1.18.zip --output checkmarx.zip
unzip checkmarx.zip

if [[ "$CODEBUILD_SOURCE_VERSION" =~ ^"pr/"[0-9]+ ]]; then
    CHECKMARX_FULL_PROJECT_PATH_RN="$CHECKMARX_FULL_PROJECT_PATH_RN"_dev
    CHECKMARX_FULL_PROJECT_PATH_IOS_BRIDGE="$CHECKMARX_FULL_PROJECT_PATH_IOS_BRIDGE"_dev
    CHECKMARX_FULL_PROJECT_PATH_ANDROID_BRIDGE="$CHECKMARX_FULL_PROJECT_PATH_ANDROID_BRIDGE"_dev
else
    CHECKMARX_FULL_PROJECT_PATH_RN="$CHECKMARX_FULL_PROJECT_PATH_RN"_prod
    CHECKMARX_FULL_PROJECT_PATH_IOS_BRIDGE="$CHECKMARX_FULL_PROJECT_PATH_IOS_BRIDGE"_prod
    CHECKMARX_FULL_PROJECT_PATH_ANDROID_BRIDGE="$CHECKMARX_FULL_PROJECT_PATH_ANDROID_BRIDGE"_prod
fi

./runCxConsole.sh Scan -v -CxServer https://worldpay.checkmarx.net -projectName "$CHECKMARX_FULL_PROJECT_PATH_RN" $CHECKMARX_PRESET -CxUser $hydra_aco_web_checkmarx_username -CxPassword $hydra_aco_web_checkmarx_password -Locationtype folder -locationpath . $CHECKMARX_EXCLUDE_FOLDERS_RN -ReportPDF checkmarx_rn.pdf -SASTMedium 0 -SASTHigh 0 -SASTLow 0 &
./runCxConsole.sh Scan -v -CxServer https://worldpay.checkmarx.net -projectName "$CHECKMARX_FULL_PROJECT_PATH_IOS_BRIDGE" $CHECKMARX_PRESET -CxUser $hydra_aco_web_checkmarx_username -CxPassword $hydra_aco_web_checkmarx_password -Locationtype folder -locationpath access-checkout-react-native-sdk/ios $CHECKMARX_EXCLUDE_FOLDERS_RN_IOS -ReportPDF checkmarx_rn_ios.pdf -SASTMedium 0 -SASTHigh 0 -SASTLow 0 &
./runCxConsole.sh Scan -v -CxServer https://worldpay.checkmarx.net -projectName "$CHECKMARX_FULL_PROJECT_PATH_ANDROID_BRIDGE" $CHECKMARX_PRESET -CxUser $hydra_aco_web_checkmarx_username -CxPassword $hydra_aco_web_checkmarx_password -Locationtype folder -locationpath access-checkout-react-native-sdk/android $CHECKMARX_EXCLUDE_FOLDERS_RN_ANDROID -ReportPDF checkmarx_rn_android.pdf -SASTMedium 0 -SASTHigh 0 -SASTLow 0 &
wait
