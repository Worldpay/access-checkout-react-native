import { type ColorValue, type StyleProp, type TextStyle } from 'react-native';
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
export declare const RTCAccessCheckoutTextInput: import("react-native").HostComponent<RTCAccessCheckoutTextInputProps>;
export {};
//# sourceMappingURL=RCTAccessCheckoutTextInput.d.ts.map