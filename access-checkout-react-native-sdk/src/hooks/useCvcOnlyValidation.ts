import { useEffect } from 'react';
import { NativeEventEmitter } from 'react-native';
import AccessCheckoutReactNative, {
  AccessCheckout,
  CardValidationEventListener,
} from '../index';
import type { CvcOnlyValidationEventListener } from '../validation/CvcOnlyValidationEventListener';
import { cvcOnlyValidationNativeEventListenerOf } from '../validation/CvcOnlyValidationEventListener';

export const useCvcOnlyValidationEventListener = (
  merchantListener: CvcOnlyValidationEventListener
) => {
  useEffect(() => {
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
};

interface UseCvcOnlyValidationHook {
  accessCheckout: AccessCheckout;
  cvcOnlyValidationConfig: {
    cvcId: string;
  };
  merchantListener: CardValidationEventListener;
}
export const useCvcOnlyValidation = ({
  accessCheckout,
  cvcOnlyValidationConfig,
  merchantListener,
}: UseCvcOnlyValidationHook) => {
  useCvcOnlyValidationEventListener(merchantListener);

  const initialiseCvcOnlyValidation = () => {
    return accessCheckout.initialiseCvcOnlyValidation(cvcOnlyValidationConfig);
  };

  return { initialiseCvcOnlyValidation };
};
