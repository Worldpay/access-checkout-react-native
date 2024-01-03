import React from 'react';
import { StyleSheet } from 'react-native';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import commonStyles from './common-styles.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import UIComponentProps from './UIComponentProps';
import AccessCheckoutInputText from '../../../access-checkout-react-native-sdk/src/ui/AccessCheckoutInputText';

const styles = StyleSheet.create({
  cvc: {
    flex: 1,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 40,
  },
});

interface CvcFieldProps extends UIComponentProps {
  isEditable: boolean;
  isValid: boolean;
}

const CvcField = (props: CvcFieldProps) => {
  return (
    <AccessCheckoutInputText
      nativeID="cvcInput"
      testID={props.testID}
      style={[
        styles.cvc,
        props.isValid ? commonStyles.valid : commonStyles.invalid,
        !props.isEditable
          ? commonStyles.greyedOut
          : props.isValid
          ? commonStyles.valid
          : commonStyles.invalid,
      ]}
      keyboardType="numeric"
      editable={props.isEditable}
      placeholder="CVC"
    />
  );
};

export default CvcField;
