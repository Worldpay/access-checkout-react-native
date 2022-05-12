import React from 'react';
import { Text, View } from 'react-native';

interface CvcFlowE2eStatesProps {
  testID: string;
  cvcIsValid?: boolean;
  submitButtonEnabled: boolean;
}

const CvcFlowE2eStates = (props: CvcFlowE2eStatesProps) => {
  return (
    <View
      testID={props.testID}
      style={{ flexDirection: 'column', width: 0, height: 0 }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Text>Cvc is valid?</Text>
        <Text testID="CvcFlowE2eStates.cvcIsValid">
          {String(props.cvcIsValid)}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text>Submit is enabled?</Text>
        <Text testID="CvcFlowE2eStates.submitButtonEnabled">
          {String(props.submitButtonEnabled)}
        </Text>
      </View>
    </View>
  );
};

export default CvcFlowE2eStates;
