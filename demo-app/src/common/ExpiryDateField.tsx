import React from 'react';
import { StyleSheet } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import commonStyles from './common-styles.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import UIComponentProps from './UIComponentProps';
import AccessCheckoutTextInput from '../../../access-checkout-react-native-sdk/src/ui/AccessCheckoutTextInput';

const styles = StyleSheet.create({
  expiry: {
    flex: 1,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 40,
  },
});

interface ExpiryDateFieldProps extends UIComponentProps {
  isEditable: boolean;
  isValid: boolean;
}

const ExpiryDateField = (props: ExpiryDateFieldProps) => {
  return (
    <AccessCheckoutTextInput
      nativeID="expiryDateInput"
      testID={props.testID}
      keyboardType="numeric"
      editable={props.isEditable}
      placeholder="MM/YY"
      style={[
        styles.expiry,
        !props.isEditable
          ? commonStyles.greyedOut
          : props.isValid
          ? commonStyles.valid
          : commonStyles.invalid,
      ]}
    />
  );
};

export default ExpiryDateField;
