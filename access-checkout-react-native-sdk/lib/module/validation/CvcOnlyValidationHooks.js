import { useEffect } from 'react';
import { NativeEventEmitter } from 'react-native';
import AccessCheckoutReactNative, { AccessCheckout, cvcOnlyValidationNativeEventListenerOf } from '../index';
// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
// @ts-ignore
export function useCvcOnlyValidationEventListener(merchantListener) {
  useEffect(() => {
    const nativeEventListener = cvcOnlyValidationNativeEventListenerOf(merchantListener);
    const nativeEventEmitter = new NativeEventEmitter(AccessCheckoutReactNative);
    const eventSubscription = nativeEventEmitter.addListener(AccessCheckout.CvcOnlyValidationEventType, nativeEventListener);
    return () => {
      eventSubscription.remove();
    };
  }, []);
}
export function useCvcOnlyValidation(accessCheckout, cvcOnlyValidationConfig, merchantListener) {
  useCvcOnlyValidationEventListener(merchantListener);
  const initialiseCvcOnlyValidation = () => {
    return accessCheckout.initialiseCvcOnlyValidation(cvcOnlyValidationConfig);
  };
  const initialiseCvcOnlyValidationPoc = () => {
    return accessCheckout.initialiseCvcOnlyValidationPoc(cvcOnlyValidationConfig);
  };
  return {
    initialiseCvcOnlyValidation,
    initialiseCvcOnlyValidationPoc
  };
}
//# sourceMappingURL=CvcOnlyValidationHooks.js.map