import {
  type ColorValue,
  findNodeHandle,
  NativeSyntheticEvent,
  requireNativeComponent,
  type StyleProp,
  type TextStyle,
  UIManager,
} from 'react-native';

/**
 * Font Changes apply to placeholder text and input text
 *
 * ## What
 * - Rewrites font support for android
 * - Adds font weight support for android <28 only 'normal' and 'bold' supported
 * - Adds font weight support as units for android >28
 */
type RTCAccessCheckoutTextInputFontProps = {
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: 'normal' | 'italic';
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
};

export type RTCAccessCheckoutTextInputProps = {
  nativeID: string;
  testID?: string;
  style?: StyleProp<TextStyle>;
  placeholder?: string;
  placeholderTextColor?: ColorValue;
  font?: RTCAccessCheckoutTextInputFontProps;
  editable?: boolean;
  color?: ColorValue;
  onFocusChange?: (e: NativeSyntheticEvent<{ isFocused: boolean }>) => void;
};

export const RTCAccessCheckoutTextInput =
  requireNativeComponent<RTCAccessCheckoutTextInputProps>('AccessCheckoutTextInput');

const COMPONENT_NAME = 'AccessCheckoutTextInput';
type NativeComponentHandle = React.Component<unknown, unknown> | number | null;

function resolveCommand(name: 'focus' | 'blur'): number | string {
  return UIManager.getViewManagerConfig(COMPONENT_NAME)?.Commands?.[name] ?? name;
}

function dispatchCommand(ref: React.RefObject<NativeComponentHandle>, commandName: 'focus' | 'blur') {
  const tag = findNodeHandle(ref.current);
  if (tag != null) {
    UIManager.dispatchViewManagerCommand(tag, resolveCommand(commandName), []);
  }
}

export function dispatchFocusCommand(ref: React.RefObject<NativeComponentHandle>) {
  dispatchCommand(ref, 'focus');
}

export function dispatchBlurCommand(ref: React.RefObject<NativeComponentHandle>) {
  dispatchCommand(ref, 'blur');
}
