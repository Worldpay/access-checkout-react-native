import React from 'react';
import {
  requireNativeComponent,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import type { ColorValue } from 'react-native/Libraries/StyleSheet/StyleSheet';

/**
 * Composes `AccessCheckoutTextInput`.
 *
 * - nativeID: string
 * - testID: string
 * - style: StyleProp<AccessCheckoutTextInputStyle>;
 * - placeholder: string
 * - editable: boolean
 */
interface AccessCheckoutTextInputProps {
  nativeID: string;
  testID?: string;
  style?: StyleProp<AccessCheckoutTextInputStyle>;
  placeholder?: string;
  editable?: boolean;
}

/**
 * Note: Not all properties apply styling to placeholder text and input text.
 *   textColor: only applies to input text.
 *   fontFamily: applies to both placeholder text and input text.
 *   fontSize:applies to both placeholder text and input text.
 */
interface AccessCheckoutTextInputStyle extends ViewStyle {
  color?: ColorValue;
  fontFamily?: string;
  fontSize?: number;
}

/**
 * Font Changes apply to placeholder text and input text
 */
interface RTCAccessCheckoutTextInputFontProps {
  fontFamily?: string;
  fontSize?: number;
}

interface RTCAccessCheckoutTextInputProps {
  nativeID: string;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
  font?: RTCAccessCheckoutTextInputFontProps;
  editable?: boolean;
  color?: ColorValue;
}

const RTCAccessCheckoutTextInput =
  requireNativeComponent<RTCAccessCheckoutTextInputProps>(
    'AccessCheckoutTextInput'
  );
const AccessCheckoutTextInput = (props: AccessCheckoutTextInputProps) => {
  const { nativeID, testID, style, placeholder, editable } = props;
  const { color, fontFamily, fontSize, ...otherStyles } = StyleSheet.flatten([
    style,
  ]);
  return (
    <View style={[otherStyles]}>
      <RTCAccessCheckoutTextInput
        nativeID={nativeID}
        testID={testID}
        style={[{ flex: 1 }]}
        placeholder={placeholder}
        font={{
          fontFamily,
          fontSize,
        }}
        color={color}
        editable={editable}
      />
    </View>
  );
};

export default AccessCheckoutTextInput;
