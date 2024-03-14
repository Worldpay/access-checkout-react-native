import React from 'react';
import { type ColorValue, type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import { RTCAccessCheckoutTextInput } from './RCTAccessCheckoutTextInput';

/**
 * Composes `AccessCheckoutTextInput`.
 * Note: If no style.height is provided height is defaulted to make the component visible
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
export type AccessCheckoutTextInputFontStyle = 'normal' | 'italic' | undefined;
export type AccessCheckoutTextInputFontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export interface AccessCheckoutTextInputStyle extends ViewStyle {
  color?: ColorValue;
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: AccessCheckoutTextInputFontStyle;
  // Specifies font weight. The values 'normal' and 'bold' are supported for most fonts. Not all fonts have a variant for each of the numeric values, in that case the closest one is chosen.
  fontWeight?: AccessCheckoutTextInputFontWeight;
}

export const AccessCheckoutTextInput: React.FC<AccessCheckoutTextInputProps> = (props) => {
  const { nativeID, testID, style, placeholder, editable } = props;

  const {
    color,
    fontFamily,
    fontSize,
    fontStyle,
    fontWeight,
    height = 40,
    ...otherStyles
  } = StyleSheet.flatten([style]);

  // Check if other styles are remaining before assigning it to the view container this helps to prevent passing in
  // an empty object wo the view container
  const viewStyles = Object.keys(otherStyles).length ? [{ height }, otherStyles] : [{ height }];

  return (
    <View testID={`${testID}-view`} style={viewStyles}>
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
