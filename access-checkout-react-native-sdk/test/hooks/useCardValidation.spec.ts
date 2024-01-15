import React from 'react';
import {
  AccessCheckout,
  CardConfig,
  CardValidationEventListener,
  CardValidationConfig,
} from '../../src';
import {
  useCardValidationEventListener,
  useCardValidation,
} from '../../src/hooks/useCardValidation';
import {
  emitNativeEvent,
  nativeEventSubscriptionMock,
} from '../__mocks__/react-native';
import { isArray, isFunction } from '../test-utils';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
let useEffectCleanUpFunction: any;
jest.spyOn(React, 'useEffect').mockImplementation((f) => {
  useEffectCleanUpFunction = f();
});

describe('useCardValidation', () => {
  describe('useCardValidationEventListener', () => {
    it('registers a NativeEvent listener for "AccessCheckoutCardValidationEvent" event', () => {
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      let panValid: any = undefined;
      const validationListener: CardValidationEventListener = {
        onPanValidChanged(isValid: boolean): void {
          panValid = isValid;
        },
      };

      useCardValidationEventListener(validationListener);

      // Emitting a fake native event using the mock in order to check listener is correctly registered
      emitNativeEvent('AccessCheckoutCardValidationEvent', {
        type: 'pan',
        isValid: true,
      });
      expect(panValid).toEqual(true);

      // Checking that event subscription has not been removed
      expect(nativeEventSubscriptionMock.remove).not.toHaveBeenCalled();
    });

    it('registers the NativeEvent listener so that it is removed when useEffect cleans up', () => {
      const validationListener: CardValidationEventListener = {};
      useCardValidationEventListener(validationListener);

      // manually calling clean up function returned by useEffect in implementation
      useEffectCleanUpFunction();

      expect(nativeEventSubscriptionMock.remove).toHaveBeenCalled();
    });
  });

  describe('useCardValidation', () => {
    const validationListener: CardValidationEventListener = {};

    const accessCheckout = new AccessCheckout({
      baseUrl: '',
      merchantId: '',
    });
    const cardValidationConfig = new CardValidationConfig({
      validationListener: validationListener,
    });
    const cardConfig = new CardConfig({
      panId: 'panInput',
      expiryDateId: 'expiryDateInput',
      cvcId: 'cvcInput',
      validationConfig: cardValidationConfig,
    });

    it('returns an object with a initialiseCardValidation property which is a function', () => {
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      const hooksValues: any = useCardValidation({
        accessCheckout,
        cardValidationConfig: cardConfig,
        validationListener: validationListener,
      });

      expect(isArray(hooksValues)).toEqual(false);
      expect(isFunction(hooksValues.initialiseCardValidation)).toEqual(true);
    });

    it('function returned is designed to initialise the card validation', () => {
      const spy = jest.spyOn(accessCheckout, 'initialiseCardValidation');
      spy.mockResolvedValue(true);

      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      const hooksValues: any = useCardValidation({
        accessCheckout,
        cardValidationConfig: cardConfig,
        validationListener: validationListener,
      });
      const functionReturned = hooksValues.initialiseCardValidation;

      functionReturned();

      expect(accessCheckout.initialiseCardValidation).toHaveBeenCalledWith(
        cardConfig
      );
    });
  });
});
