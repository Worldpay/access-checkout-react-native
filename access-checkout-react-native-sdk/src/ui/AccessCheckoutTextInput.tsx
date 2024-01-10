import React from 'react';
import {
  requireNativeComponent,
  type StyleProp,
  StyleSheet,
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
 *   fontStyle:applies to both placeholder text and input text.
 *   fontWeight:applies to both placeholder text and input text.
 */
interface AccessCheckoutTextInputStyle extends ViewStyle {
  textColor?: ColorValue;
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
  style?: StyleProp<TextStyle>;
  placeholder?: string;
  textColor?: ColorValue;
  font?: RTCAccessCheckoutTextInputFontProps;
  editable?: boolean;
}

const RTCAccessCheckoutTextInput =
  requireNativeComponent<RTCAccessCheckoutTextInputProps>(
    'AccessCheckoutTextInput'
  );
const AccessCheckoutTextInput = (props: AccessCheckoutTextInputProps) => {
  const { nativeID, testID, style, placeholder, editable } = props;
  const { textColor, fontFamily, fontSize, ...otherStyles } =
    StyleSheet.flatten([style]);
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
        textColor={textColor}
        editable={editable}
      />
    </View>
  );
};

export default AccessCheckoutTextInput;
