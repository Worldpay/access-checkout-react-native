import React from 'react';
import { StyleSheet } from 'react-native';
import type UIComponentProps from './UIComponentProps';
import AccessCheckoutTextInput from '../../../access-checkout-react-native-sdk/src/ui/AccessCheckoutTextInput';

const styles = StyleSheet.create({
  cvc: {
    flex: 1,
    flexDirection: 'row',
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
  },
});

interface CvcFieldProps extends UIComponentProps {
  isEditable: boolean;
  isValid: boolean;
}

const CvcField = (props: CvcFieldProps) => {
  const validationColours = props.isValid ? 'green' : 'red';
  const validationColourStyle = props.isEditable ? validationColours : 'silver';

  return (
    <AccessCheckoutTextInput
      nativeID="cvcInput"
      testID={props.testID}
      style={[
        styles.cvc,
        {
          color: validationColourStyle,
          borderColor: validationColourStyle,
        },
      ]}
      editable={props.isEditable}
      placeholder="CVC"
    />
  );
};

export default CvcField;
