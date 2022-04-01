export declare type Session = {
    card: string;
    cvc: string;
};
declare type AccessCheckoutReactNativeType = {
    generateSessions(config: any): Promise<Session>;
    initialiseCardValidation(config: any): Promise<boolean>;
    addListener: (eventType: string) => void;
    removeListeners: (count: number) => void;
};
export declare const AccessCheckoutReactNative: any;
declare const _default: AccessCheckoutReactNativeType;
export default _default;
export { default as AccessCheckout } from './AccessCheckout';
export { default as CardDetails } from './session/CardDetails';
export { default as SessionType } from './session/SessionType';
export { default as CardValidationConfig } from './validation/CardValidationConfig';
export { default as Brand } from './validation/Brand';
export { default as BrandImage } from './validation/BrandImage';
export { CardValidationEventListener, cardValidationNativeEventListenerOf, } from './validation/CardValidationEventListener';
export { useCardValidation } from './validation/CardValidationHooks';
