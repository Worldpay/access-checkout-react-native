import { useEffect } from 'react';
import { NativeEventEmitter } from 'react-native';
import AccessCheckout from '../AccessCheckout';
import AccessCheckoutReactNative from '../AccessCheckoutReactNative';
import {
  CardValidationEventListener,
  cardValidationNativeEventListenerOf,
} from '../validation/CardValidationEventListener';

export function useCardValidationEventListener(
  merchantListener: CardValidationEventListener
) {
  useEffect(() => {
    const nativeEventListener =
      cardValidationNativeEventListenerOf(merchantListener);
    const nativeEventEmitter = new NativeEventEmitter(
      AccessCheckoutReactNative
    );

    const eventSubscription = nativeEventEmitter.addListener(
      AccessCheckout.CardValidationEventType,
      nativeEventListener
    );

    return () => {
      eventSubscription.remove();
    };
  }, []);
}

interface UseCardValidationHook {
  accessCheckout: AccessCheckout;
  cardValidationConfig: {
    panId: string;
    expiryDateId: string;
    cvcId: string;
    enablePanFormatting?: boolean;
    acceptedCardBrands?: string[];
  };
  merchantListener: CardValidationEventListener;
}
export function useCardValidation({
  accessCheckout,
  cardValidationConfig,
  merchantListener,
}: UseCardValidationHook) {
  useCardValidationEventListener(merchantListener);
  const initialiseCardValidation = () => {
    return accessCheckout.initialiseCardValidation(cardValidationConfig);
  };

  return { initialiseCardValidation };
}
