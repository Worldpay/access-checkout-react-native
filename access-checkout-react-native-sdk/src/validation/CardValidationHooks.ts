import { useEffect } from 'react';
import { NativeEventEmitter } from 'react-native';
import AccessCheckoutReactNative, {
  AccessCheckout,
  CardValidationConfig,
  cardValidationNativeEventListenerOf,
} from '../index';
// @ts-ignore
import { CardValidationEventListener } from './CardValidationEventListener';

export function useCardValidationEventListener(
  merchantListener: CardValidationEventListener
) {
  useEffect(() => {
    console.debug(
      `Adding CardValidationEventListener for ${AccessCheckout.CardValidationEventType} events`
    );

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

export function useCardValidation(
  accessCheckout: AccessCheckout,
  cardValidationConfig: CardValidationConfig,
  merchantListener: CardValidationEventListener
) {
  useCardValidationEventListener(merchantListener);

  const initialiseCardValidation = () => {
    console.debug(`Initialising validation`);
    return accessCheckout.initialiseCardValidation(cardValidationConfig);
  };

  return [initialiseCardValidation];
}
