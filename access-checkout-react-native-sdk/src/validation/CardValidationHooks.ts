import { useEffect } from 'react';
import { NativeEventEmitter } from 'react-native';
import AccessCheckout from '../AccessCheckout';
import AccessCheckoutReactNative from '../AccessCheckoutReactNative';
// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
// @ts-ignore
import CardValidationConfig from './CardValidationConfig';
// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
  CardValidationEventListener,
  cardValidationNativeEventListenerOf,
} from './CardValidationEventListener';

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

export function useCardValidation(
  accessCheckout: AccessCheckout,
  cardValidationConfig: CardValidationConfig,
  merchantListener: CardValidationEventListener
) {
  useCardValidationEventListener(merchantListener);

  const initialiseCardValidation = () => {
    return accessCheckout.initialiseCardValidation(cardValidationConfig);
  };

  return { initialiseCardValidation };
}
