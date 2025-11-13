import React from 'react';

import type UIComponentProps from './UIComponentProps';
import { AccessCheckoutTextInput } from '@worldpay/access-worldpay-checkout-react-native-sdk';
import { StyleSheet } from 'react-native';

interface ExpiryDateFieldProps extends UIComponentProps {
  isEditable: boolean;
  isValid?: boolean;
}

const styles = StyleSheet.create({
  expiry: {
    flex: 1,
    flexDirection: 'row',
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

const getValidationColors = (isEditable: boolean, isValid?: boolean) => {
  const validationColor =
    isValid === undefined ? 'black' : isValid ? 'green' : 'red';
  return {
    //Border color uses silver by default
    borderColor:
      isEditable && isValid !== undefined ? validationColor : 'silver',
    //Text color uses black
    textColor: isEditable && isValid !== undefined ? validationColor : 'black',
  };
};

const ExpiryDateField = (props: ExpiryDateFieldProps) => {
  const { borderColor, textColor } = getValidationColors(
    props.isEditable,
    props.isValid
  );

  return (
    <AccessCheckoutTextInput
      nativeID="expiryDateInput"
      testID={props.testID}
      editable={props.isEditable}
      placeholder="MM/YY"
      style={[
        styles.expiry,
        {
          color: textColor,
          borderColor: borderColor,
        },
      ]}
    />
  );
};

export default ExpiryDateField;
