import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import commonStyles from './common-styles.js';

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

interface ExpiryDateFieldProps {
  isEditable: boolean;
  isValid: boolean;
  onChange(text: string): void;
}

const ExpiryDateField = (props: ExpiryDateFieldProps) => {
  const [expiryValue, setExpiry] = useState<string>('');

  return (
    <TextInput
      nativeID="expiryDateInput"
      testID="expiryDateInput"
      style={[
        styles.expiry,
        !props.isEditable
          ? commonStyles.greyedOut
          : props.isValid
          ? commonStyles.valid
          : commonStyles.invalid,
      ]}
      keyboardType="numeric"
      onChangeText={(text) => {
        setExpiry(text);
        props.onChange(text);
      }}
      editable={props.isEditable}
      value={expiryValue}
      placeholder="MM/YY"
    />
  );
};

export default ExpiryDateField;
