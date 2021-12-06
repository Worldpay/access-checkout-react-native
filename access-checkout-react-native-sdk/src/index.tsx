import { NativeModules } from 'react-native';

type Session = {
  card: string;
  cvc: string;
};

type AccessCheckoutReactNativeType = {
  generateSessions(config: any): Promise<Session>;
  initialiseValidation(config: any): Promise<boolean>;
};

const { AccessCheckoutReactNative } = NativeModules;

export default AccessCheckoutReactNative as AccessCheckoutReactNativeType;
