import React from 'react';
import { type ColorValue, type StyleProp, type ViewStyle } from 'react-native';
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
export declare type AccessCheckoutTextInputFontStyle = 'normal' | 'italic' | undefined;
export declare type AccessCheckoutTextInputFontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
export interface AccessCheckoutTextInputStyle extends ViewStyle {
    color?: ColorValue;
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: AccessCheckoutTextInputFontStyle;
    fontWeight?: AccessCheckoutTextInputFontWeight;
}
export declare const AccessCheckoutTextInput: React.FC<AccessCheckoutTextInputProps>;
