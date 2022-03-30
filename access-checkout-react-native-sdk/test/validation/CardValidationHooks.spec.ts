import React from 'react';
import {
  AccessCheckout,
  CardValidationConfig,
  CardValidationEventListener,
} from '../../src';
import {
  useCardValidationEventListener,
  useCardValidation,
} from '../../src/validation/CardValidationHooks';
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

describe('CardValidationHooks', function () {
  describe('useCardValidationEventListener', () => {
    it('registers a NativeEvent listener for "AccessCheckoutCardValidationEvent" event', () => {
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      let panValid: any = undefined;
      const merchantListener: CardValidationEventListener = {
        onPanValidChanged(isValid: boolean): void {
          panValid = isValid;
        },
      };

      useCardValidationEventListener(merchantListener);

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
      const merchantListener: CardValidationEventListener = {};
      useCardValidationEventListener(merchantListener);

      // manually calling clean up function returned by useEffect in implementation
      useEffectCleanUpFunction();

      expect(nativeEventSubscriptionMock.remove).toHaveBeenCalled();
    });
  });

  describe('useCardValidation', () => {
    const merchantListener: CardValidationEventListener = {};

    const accessCheckout = new AccessCheckout({
      accessBaseUrl: '',
      merchantId: '',
    });
    const validationConfig = new CardValidationConfig({
      panId: 'panInput',
      expiryDateId: 'expiryDateInput',
      cvcId: 'cvcInput',
    });

    it('returns an object with a initialiseCardValidation property which is a function', () => {
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      const hooksValues: any = useCardValidation(
        accessCheckout,
        validationConfig,
        merchantListener
      );

      expect(isArray(hooksValues)).toEqual(false);
      expect(isFunction(hooksValues.initialiseCardValidation)).toEqual(true);
    });

    it('function returned is designed to initialise the card validation', () => {
      jest.spyOn(accessCheckout, 'initialiseCardValidation');

      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      const hooksValues: any = useCardValidation(
        accessCheckout,
        validationConfig,
        merchantListener
      );
      const functionReturned = hooksValues.initialiseCardValidation;

      functionReturned();

      expect(accessCheckout.initialiseCardValidation).toHaveBeenCalledWith(
        validationConfig
      );
    });
  });
});
