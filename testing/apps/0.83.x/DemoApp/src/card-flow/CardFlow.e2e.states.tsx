import React from 'react';
import { Text, View } from 'react-native';

interface CardFlowE2eStatesProps {
  testID: string;
  cardBrand?: string;
  panIsValid?: boolean;
  expiryDateIsValid?: boolean;
  cvcIsValid?: boolean;
  submitButtonEnabled: boolean;
}

const CardFlowE2eStates = (props: CardFlowE2eStatesProps) => {
  return (
    <View
      testID={props.testID}
      style={{ flexDirection: 'column', width: 0, height: 0 }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Text>Pan is valid?</Text>
        <Text testID="cardFlowE2eStates.panIsValid">
          {String(props.panIsValid)}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text>Expiry Date is valid?</Text>
        <Text testID="cardFlowE2eStates.expiryDateIsValid">
          {String(props.expiryDateIsValid)}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text>Cvc is valid?</Text>
        <Text testID="cardFlowE2eStates.cvcIsValid">
          {String(props.cvcIsValid)}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text>Submit is enabled?</Text>
        <Text testID="cardFlowE2eStates.submitButtonEnabled">
          {String(props.submitButtonEnabled)}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text>Card brand?</Text>
        <Text testID="cardFlowE2eStates.cardBrand">
          {String(props.cardBrand)}
        </Text>
      </View>
    </View>
  );
};

export default CardFlowE2eStates;
