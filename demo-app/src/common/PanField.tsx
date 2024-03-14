import React from 'react';
import { StyleSheet } from 'react-native';
import { AccessCheckoutTextInput } from '../../../access-checkout-react-native-sdk/src';
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
  isValid: boolean;
}

const PanField = (props: PanFieldProps) => {
  const validationColours = props.isValid ? 'green' : 'red';
  const validationColourStyle = props.isEditable ? validationColours : 'silver';

  return (
    <AccessCheckoutTextInput
      nativeID="panInput"
      testID={props.testID}
      style={[
        styles.pan,
        {
          color: validationColourStyle,
          borderColor: validationColourStyle,
        },
      ]}
      editable={props.isEditable}
      placeholder="Card Number"
    />
  );
};

export default PanField;
