import { useEffect } from 'react';
import { NativeEventEmitter } from 'react-native';
import AccessCheckout from '../AccessCheckout';
import AccessCheckoutReactNative from '../AccessCheckoutReactNative'; // eslint-disable-next-line  @typescript-eslint/ban-ts-comment
// @ts-ignore

// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
// @ts-ignore
import { cardValidationNativeEventListenerOf } from './CardValidationEventListener';
export function useCardValidationEventListener(merchantListener) {
  useEffect(() => {
    const nativeEventListener = cardValidationNativeEventListenerOf(merchantListener);
    const nativeEventEmitter = new NativeEventEmitter(AccessCheckoutReactNative);
    const eventSubscription = nativeEventEmitter.addListener(AccessCheckout.CardValidationEventType, nativeEventListener);
    return () => {
      eventSubscription.remove();
    };
  }, []);
}
export function useCardValidation(accessCheckout, cardValidationConfig, merchantListener) {
  useCardValidationEventListener(merchantListener);

  const initialiseCardValidation = () => {
    return accessCheckout.initialiseCardValidation(cardValidationConfig);
  };

  return {
    initialiseCardValidation
  };
}
//# sourceMappingURL=CardValidationHooks.js.map