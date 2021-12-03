import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

// @ts-ignore
import commonStyles from './common-styles.js';

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

interface PanFieldProps {
  isEditable: boolean;
  isValid: boolean;
  onChange(text: string): void;
}

const PanField = (props: PanFieldProps) => {
  const [panValue, setPan] = useState<string>('');

  return (
    <TextInput
      nativeID="panInput"
      testID="panInput"
      style={[
        styles.pan,
        !props.isEditable
          ? commonStyles.greyedOut
          : props.isValid
          ? commonStyles.valid
          : commonStyles.invalid,
      ]}
      keyboardType="numeric"
      onChangeText={(text) => {
        setPan(text);
        props.onChange(text);
      }}
      editable={props.isEditable}
      value={panValue}
      placeholder="Card Number"
    />
  );
};

export default PanField;
