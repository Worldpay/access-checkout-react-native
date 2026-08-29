import React from 'react';
import { Text, View } from 'react-native';

interface CvcOnlyFlowE2eStatesProps {
  testID: string;
  cvcIsValid?: boolean;
  submitButtonEnabled: boolean;
}

const CvcOnlyFlowE2eStates = (props: CvcOnlyFlowE2eStatesProps) => {
  return (
    <View
      testID={props.testID}
      style={{ flexDirection: 'column', width: 0, height: 0 }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Text>Cvc is valid?</Text>
        <Text testID="cvcOnlyFlowE2eStates.cvcIsValid">
          {String(props.cvcIsValid)}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text>Submit is enabled?</Text>
        <Text testID="cvcOnlyFlowE2eStates.submitButtonEnabled">
          {String(props.submitButtonEnabled)}
        </Text>
      </View>
    </View>
  );
};

export default CvcOnlyFlowE2eStates;
