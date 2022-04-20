import { NativeModules } from 'react-native';

type BridgeSessions = {
  card: string;
  cvc: string;
};

type AccessCheckoutReactNativeType = {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  generateSessions(config: any): Promise<BridgeSessions>;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  initialiseCardValidation(config: any): Promise<boolean>;
  addListener: (eventType: string) => void;
  removeListeners: (count: number) => void;
};

export const { AccessCheckoutReactNative } = NativeModules;

export default AccessCheckoutReactNative as AccessCheckoutReactNativeType;
