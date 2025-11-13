import { NativeModules } from 'react-native';

type BridgeSessions = {
  card: string;
  cvc: string;
};

interface AccessCheckoutReactNativeType {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  generateSessions(config: any): Promise<BridgeSessions>;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  initialiseCardValidation(config: any): Promise<boolean>;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  initialiseCvcOnlyValidation(config: any): Promise<boolean>;
  addListener: (eventType: string) => void;
  removeListeners: (count: number) => void;
  registerView(tag: number | null, nativeId: string): void;
}

export const { AccessCheckoutReactNative } = NativeModules;

export default AccessCheckoutReactNative as AccessCheckoutReactNativeType;
