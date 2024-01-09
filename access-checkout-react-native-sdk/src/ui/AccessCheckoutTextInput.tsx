import React from 'react';
import {
  requireNativeComponent,
  type StyleProp,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import type { ColorValue } from 'react-native/Libraries/StyleSheet/StyleSheet';

/**
 * Composes `AccessCheckoutTextInput`.
 *
 * - nativeID: string
 * - testID: string
 * - style: StyleProp
 * - editable: boolean
 * - placeholder: string
 */
interface AccessCheckoutTextInputProps {
  nativeID: string;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
  keyboardType?: string;
  textColor?: ColorValue;
  font?: string;
  editable?: boolean;
}

interface RTCAccessCheckoutTextInputProps {
  nativeID: string;
  testID?: string;
  style?: StyleProp<TextStyle>;
  placeholder?: string;
  keyboardType?: string; //maybe remove?
  textColor?: ColorValue;
  font?: string;
  editable?: boolean;
}

const RTCAccessCheckoutTextInput =
  requireNativeComponent<RTCAccessCheckoutTextInputProps>(
    'AccessCheckoutTextInput'
  );
const AccessCheckoutTextInput = (props: AccessCheckoutTextInputProps) => {
  const {
    nativeID,
    testID,
    style,
    placeholder,
    keyboardType,
    textColor,
    editable,
  } = props;

  console.log(placeholder);
  return (
    <View style={[style]}>
      <RTCAccessCheckoutTextInput
        nativeID={nativeID}
        testID={testID}
        style={[{ flex: 1 }]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        textColor={textColor}
        editable={editable}
      />
    </View>
  );
};

export default AccessCheckoutTextInput;
