import { NativeModules } from "react-native";

export type Session = {
  card: string;
  cvc: string;
};

type AccessCheckoutReactNativeType = {
  generateSessions(config: any): Promise<Session>;
  initialiseValidation(config: any): Promise<boolean>;
  addListener: (eventType: string) => void;
  removeListeners: (count: number) => void;
};

export const { AccessCheckoutReactNative } = NativeModules;

export default AccessCheckoutReactNative as AccessCheckoutReactNativeType;

export { default as AccessCheckout } from './AccessCheckout';

export { default as CardDetails } from './session/CardDetails';

export { default as SessionType } from './session/SessionType';

export { default as CardValidationConfig } from './validation/CardValidationConfig';
