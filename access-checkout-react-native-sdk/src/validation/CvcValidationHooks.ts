import { useEffect } from 'react';
import { NativeEventEmitter } from 'react-native';
import AccessCheckoutReactNative, {
    AccessCheckout,
    CvcValidationConfig,
    cvcValidationNativeEventListenerOf,
} from '../index';
// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CvcValidationEventListener } from './CvcValidationEventListener';

export function useCvcValidationEventListener(
    merchantListener: CvcValidationEventListener
) {
    useEffect(() => {
        console.debug(
            `Adding CvcValidationEventListener for ${AccessCheckout.CardValidationEventType} events`
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

    return { initialiseCardValidation };
}
