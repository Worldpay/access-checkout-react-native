import React from 'react';
import { StyleSheet } from 'react-native';
import type UIComponentProps from './UIComponentProps';
import { AccessCheckoutTextInput } from '@worldpay/access-worldpay-checkout-react-native-sdk';

const styles = StyleSheet.create({
  cvc: {
    flex: 1,
    flexDirection: 'row',
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

interface CvcFieldProps extends UIComponentProps {
  isEditable: boolean;
  isValid?: boolean;
}

const getValidationColors = (isEditable: boolean, isValid?: boolean) => {
  const validationColor = isValid === undefined ? 'black' : isValid ? 'green' : 'red';
  return {
    //Border color uses silver by default
    borderColor: isEditable && isValid !== undefined ? validationColor : 'silver',
    //Text color uses black
    textColor: isEditable && isValid !== undefined ? validationColor : 'black',
  };
};

const CvcField = (props: CvcFieldProps) => {
  const { borderColor, textColor } = getValidationColors(props.isEditable, props.isValid);

  return (
    <AccessCheckoutTextInput
      nativeID="cvcInput"
      testID={props.testID}
      style={[
        styles.cvc,
        {
          color: textColor,
          borderColor: borderColor,
        },
      ]}
      editable={props.isEditable}
      placeholder="CVC"
    />
  );
};

export default CvcField;
