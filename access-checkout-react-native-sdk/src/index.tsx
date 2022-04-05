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

export { default as AccessCheckout } from './AccessCheckout';

export { default as CardDetails } from './session/CardDetails';

export { default as SessionType, CARD, CVC } from './session/SessionType';

export { default as Sessions } from './session/Sessions';

export { default as CardValidationConfig } from './validation/CardValidationConfig';

export { default as Brand } from './validation/Brand';

export { default as BrandImage } from './validation/BrandImage';

export {
  CardValidationEventListener,
  cardValidationNativeEventListenerOf,
} from './validation/CardValidationEventListener';

export { useCardValidation } from './validation/CardValidationHooks';
