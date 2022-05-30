#!/bin/bash

version="$(jq -r '.version' ./package.json)"
if ! [[ "${version}" =~ ^([0-9]+)\.([0-9]+)\.([0-9]+)$ ]]; then
  echo "Failed to find version in format x.y.z (instead found '${version}')"
  exit 1
fi

if [ $CODEBUILD_BUILD_SUCCEEDING -eq 1 ]; then
  emoji=":+1:"
  color="#31AD72"
  header="Success"
  text="Access Checkout React Native *No.${version}* Deployment has completed successfully."
else
  emoji=":-1:"
  color="#EA5E1A"
  header="Failed"
  text="Access Checkout React Native *No.${version}* Deployment has failed."
fi

payload="{
	\"channel\":\"#access-checkout-build\",
	\"username\":\"Access Checkout React Native\",
	\"icon_emoji\": \"${emoji}\",
	\"attachments\": [
		{

			\"color\": \"${color}\",
			\"blocks\": [
				{
					\"type\": \"header\",
					\"text\": {
						\"type\": \"plain_text\",
						\"text\": \"${header}\"
					}
				},
				{
					\"type\": \"context\",
					\"elements\": [
						{
							\"type\": \"mrkdwn\",
							\"text\": \"${text}\"
						}
					]
				}
			]
		}
	]
}"

result=$(curl -v -X POST --data-urlencode "payload=${payload}" ${SLACK_WEBHOOK_URL})

if [ "${result}" != "ok" ]; then
  echo $result
  exit 1
fi
