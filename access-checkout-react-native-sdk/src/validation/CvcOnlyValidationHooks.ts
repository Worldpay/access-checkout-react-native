import { useEffect } from 'react';
import { NativeEventEmitter } from 'react-native';
import AccessCheckoutReactNative, {
  AccessCheckout,
  CvcOnlyValidationConfig,
  cvcOnlyValidationNativeEventListenerOf,
} from '../index';
// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CvcOnlyValidationEventListener } from './CvcOnlyValidationEventListener';

export function useCvcOnlyValidationEventListener(
  merchantListener: CvcOnlyValidationEventListener
) {
  useEffect(() => {
    console.debug(
      `Adding CvcOnlyValidationEventListener for ${AccessCheckout.CvcOnlyValidationEventType} events`
    );

    const nativeEventListener =
      cvcOnlyValidationNativeEventListenerOf(merchantListener);
    const nativeEventEmitter = new NativeEventEmitter(
      AccessCheckoutReactNative
    );

    const eventSubscription = nativeEventEmitter.addListener(
      AccessCheckout.CvcOnlyValidationEventType,
      nativeEventListener
    );

    return () => {
      eventSubscription.remove();
    };
  }, []);
}

export function useCvcOnlyValidation(
  accessCheckout: AccessCheckout,
  cvcOnlyValidationConfig: CvcOnlyValidationConfig,
  merchantListener: CvcOnlyValidationEventListener
) {
  useCvcOnlyValidationEventListener(merchantListener);

  const initialiseCvcOnlyValidation = () => {
    console.debug(`Initialising validation`);
    return accessCheckout.initialiseCvcOnlyValidation(cvcOnlyValidationConfig);
  };

  return { initialiseCvcOnlyValidation };
}
