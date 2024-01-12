import { useEffect } from 'react';
import { NativeEventEmitter } from 'react-native';
import AccessCheckoutReactNative, { AccessCheckout } from '../index';
import { cvcOnlyValidationNativeEventListenerOf } from '../validation/CvcOnlyValidationEventListener';
export const useCvcOnlyValidationEventListener = merchantListener => {
  useEffect(() => {
    const nativeEventListener = cvcOnlyValidationNativeEventListenerOf(merchantListener);
    const nativeEventEmitter = new NativeEventEmitter(AccessCheckoutReactNative);
    const eventSubscription = nativeEventEmitter.addListener(AccessCheckout.CvcOnlyValidationEventType, nativeEventListener);
    return () => {
      eventSubscription.remove();
    };
  }, []);
};
export const useCvcOnlyValidation = ({
  accessCheckout,
  cvcOnlyValidationConfig,
  merchantListener
}) => {
  useCvcOnlyValidationEventListener(merchantListener);
  const initialiseCvcOnlyValidation = () => {
    return accessCheckout.initialiseCvcOnlyValidation(cvcOnlyValidationConfig);
  };
  return {
    initialiseCvcOnlyValidation
  };
};
//# sourceMappingURL=useCvcOnlyValidation.js.map