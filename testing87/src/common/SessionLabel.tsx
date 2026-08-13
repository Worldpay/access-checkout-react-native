import React from 'react';
import { Text, View } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import UIComponentProps from './UIComponentProps';

interface SessionLabelProps extends UIComponentProps {
  label: string;
  session: string;
}

const SessionLabel = (props: SessionLabelProps) => {
  return (
    <View style={{ flexDirection: 'row', marginTop: '2%' }}>
      <Text style={{ fontSize: 11 }}>{props.label}</Text>
      <Text
        testID={props.testID}
        style={{ fontSize: 11, flex: 1, flexWrap: 'wrap' }}
      >
        {props.session}
      </Text>
    </View>
  );
};

export default SessionLabel;
