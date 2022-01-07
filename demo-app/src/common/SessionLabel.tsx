import React from 'react';
import { Text, View } from 'react-native';
// @ts-ignore
import UIComponentProps from './UIComponentProps';

interface SessionLabelProps extends UIComponentProps {
  label: string;
  session: string;
}

const SessionLabel = (props: SessionLabelProps) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ fontSize: 11 }}>{props.label}</Text>
      <Text testID={props.testID} style={{ fontSize: 11 }}>
        {props.session}
      </Text>
    </View>
  );
};

export default SessionLabel;
