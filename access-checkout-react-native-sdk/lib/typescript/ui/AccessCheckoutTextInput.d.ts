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
declare const AccessCheckoutTextInput: (props: AccessCheckoutTextInputProps) => React.JSX.Element;
export default AccessCheckoutTextInput;
