import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
}
export declare const AccessCheckoutTextInput: (props: AccessCheckoutTextInputProps) => React.JSX.Element;
export default AccessCheckoutTextInput;
