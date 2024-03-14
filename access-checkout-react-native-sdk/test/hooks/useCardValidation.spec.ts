import React from 'react';
import { AccessCheckout, CardConfig, CardValidationEventListener, MerchantCardValidationConfig } from '../../src';
import { useCardValidationEventListener, useCardValidation } from '../../src/hooks/useCardValidation';
import { getMockNativeEventEmitterSubscription, isArray, isFunction } from '../test-utils';
import { renderHook } from '@testing-library/react-native';
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
let useEffectCleanUpFunction: any;
jest.spyOn(React, 'useEffect').mockImplementation((f) => {
  useEffectCleanUpFunction = f();
});

describe('useCardValidation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useCardValidationEventListener', () => {
    it('registers a NativeEvent listener for "AccessCheckoutCardValidationEvent" event', async () => {
      let panValid: boolean | undefined = undefined;

      const validationListener: CardValidationEventListener = {
        onPanValidChanged(isValid: boolean): void {
          panValid = isValid;
        },
      };

      renderHook(() => useCardValidationEventListener(validationListener));
      const eventSubscription = getMockNativeEventEmitterSubscription();
      // Checking that event subscription has not been removed
      expect(eventSubscription.remove).not.toHaveBeenCalled();

      // Emitting a fake native event using the mock in order to check listener is correctly registered
      eventSubscription.emit('AccessCheckoutCardValidationEvent', {
        type: 'pan',
        isValid: true,
      });

      expect(panValid).toEqual(true);
    });

    it('registers the NativeEvent listener so that it is removed when useEffect cleans up', () => {
      const validationListener: CardValidationEventListener = {};

      renderHook(() => {
        useCardValidationEventListener(validationListener);
        // manually calling clean up function returned by useEffect in implementation
        useEffectCleanUpFunction();
      });
      // manually calling clean up function returned by useEffect in implementation

      const eventSubscription = getMockNativeEventEmitterSubscription();
      // Checking that event subscription has been removed
      expect(eventSubscription.remove).toHaveBeenCalled();
    });
  });

  describe('useCardValidation', () => {
    const validationListener: CardValidationEventListener = {};

    const accessCheckout = new AccessCheckout({
      baseUrl: '',
      merchantId: '',
    });
    const cardValidationConfig = new MerchantCardValidationConfig({
      validationListener: validationListener,
    });
    const cardConfig = new CardConfig({
      panId: 'panInput',
      expiryDateId: 'expiryDateInput',
      cvcId: 'cvcInput',
      validationConfig: cardValidationConfig,
    });

    it('returns an object with a initialiseCardValidation property which is a function', () => {
      renderHook(() => {
        const hooksValues = useCardValidation({
          accessCheckout,
          cardValidationConfig: cardConfig,
          validationListener: validationListener,
        });
        expect(isArray(hooksValues)).toEqual(false);
        expect(isFunction(hooksValues.initialiseCardValidation)).toEqual(true);
      });
    });

    it('function returned is designed to initialise the card validation', () => {
      const spy = jest.spyOn(accessCheckout, 'initialiseCardValidation');
      spy.mockResolvedValue(true);

      renderHook(() => {
        const hooksValues = useCardValidation({
          accessCheckout,
          cardValidationConfig: cardConfig,
          validationListener: validationListener,
        });
        const functionReturned = hooksValues.initialiseCardValidation;

        functionReturned();
      });
      expect(accessCheckout.initialiseCardValidation).toHaveBeenCalledWith(cardConfig);
    });
  });
});
