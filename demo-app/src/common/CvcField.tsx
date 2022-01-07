import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import commonStyles from './common-styles.js';

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

interface CvcFieldProps {
  isEditable: boolean;
  isValid: boolean;
  onChange(text: string): void;
}

const CvcField = (props: CvcFieldProps) => {
  const [cvcValue, setCvc] = useState<string>('');

  return (
    <TextInput
      nativeID="cvcInput"
      testID="cvcInput"
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
      onChangeText={(text) => {
        setCvc(text);
        props.onChange(text);
      }}
      editable={props.isEditable}
      value={cvcValue}
      placeholder="CVC"
    />
  );
};

export default CvcField;
