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
  pan: {
    flex: 8,
    margin: 12,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 40,
  },
});

interface PanFieldProps extends UIComponentProps {
  isEditable: boolean;
  isValid: boolean;
}

const PanField = (props: PanFieldProps) => {
  return (
    <AccessCheckoutEditText
      nativeID="panInput"
      testID={props.testID}
      style={[
        styles.pan,
        !props.isEditable
          ? commonStyles.greyedOut
          : props.isValid
          ? commonStyles.valid
          : commonStyles.invalid,
      ]}
      editable={props.isEditable}
      placeholder="Card Number"
    />
  );
};

export default PanField;
