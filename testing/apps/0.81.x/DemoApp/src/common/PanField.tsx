import React from 'react';
import { StyleSheet } from 'react-native';
import { AccessCheckoutTextInput } from '@worldpay/access-worldpay-checkout-react-native-sdk';
import type UIComponentProps from './UIComponentProps';

const styles = StyleSheet.create({
  pan: {
    flex: 8,
    flexDirection: 'row',
    margin: 12,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

interface PanFieldProps extends UIComponentProps {
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

const PanField = (props: PanFieldProps) => {
  const { borderColor, textColor } = getValidationColors(props.isEditable, props.isValid);
  return (
    <AccessCheckoutTextInput
      nativeID="panInput"
      testID={props.testID}
      style={[
        styles.pan,
        {
          color: textColor,
          borderColor: borderColor,
        },
      ]}
      editable={props.isEditable}
      placeholder="Card Number"
    />
  );
};

export default PanField;
