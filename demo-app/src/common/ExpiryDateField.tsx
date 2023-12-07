import React from 'react';
import { StyleSheet } from 'react-native';
import AccessCheckoutEditText from '../../../access-checkout-react-native-sdk/src/ui/AccessCheckoutEditText';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import commonStyles from './common-styles.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import UIComponentProps from './UIComponentProps';

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
    <AccessCheckoutEditText
      nativeID="expiryDateInput"
      testID={props.testID}
      style={[
        styles.expiry,
        !props.isEditable
          ? commonStyles.greyedOut
          : props.isValid
          ? commonStyles.valid
          : commonStyles.invalid,
      ]}
      editable={props.isEditable}
      placeholder="MM/YY"
    />
  );
};

export default ExpiryDateField;
