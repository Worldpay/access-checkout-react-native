import React from 'react';
import { requireNativeComponent, type StyleProp, StyleSheet, type TextStyle, View, type ViewStyle } from 'react-native';
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
export interface AccessCheckoutTextInputProps {
  nativeID: string;
  testID?: string;
  style?: StyleProp<AccessCheckoutTextInputStyle>;
  placeholder?: string;
  editable?: boolean;
}

/**
 * Note: Not all properties apply styling to both placeholder text and input text.
 *   textColor: only applies to input text.
 *   fontFamily: applies to both placeholder text and input text.
 *   fontSize: applies to both placeholder text and input text.
 *   fontStyle: applies to both placeholder text and input text.
 *   fontWeight: applies to both placeholder text and input text.
 */
export interface AccessCheckoutTextInputStyle extends ViewStyle {
  color?: ColorValue;
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: 'normal' | 'italic';
  // Specifies font weight. The values 'normal' and 'bold' are supported for most fonts. Not all fonts have a variant for each of the numeric values, in that case the closest one is chosen.
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
}

/**
 * Font Changes apply to placeholder text and input text
 *
 * ## What
 * - Rewrites font support for android
 * - Adds font weight support for android <28 only 'normal' and 'bold' supported
 * - Adds font weight support as units for android >28
 */
interface RTCAccessCheckoutTextInputFontProps {
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: 'normal' | 'italic';
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
}

interface RTCAccessCheckoutTextInputProps {
  nativeID: string;
  testID?: string;
  style?: StyleProp<TextStyle>;
  placeholder?: string;
  font?: RTCAccessCheckoutTextInputFontProps;
  editable?: boolean;
  color?: ColorValue;
}

const RTCAccessCheckoutTextInput = requireNativeComponent<RTCAccessCheckoutTextInputProps>('AccessCheckoutTextInput');
export const AccessCheckoutTextInput = (props: AccessCheckoutTextInputProps) => {
  const { nativeID, testID, style, placeholder, editable } = props;
  const { color, fontFamily, fontSize, fontStyle, fontWeight, ...otherStyles } = StyleSheet.flatten([style]);
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
          fontWeight,
          fontStyle,
        }}
        color={color}
        editable={editable}
      />
    </View>
  );
};

export default AccessCheckoutTextInput;
