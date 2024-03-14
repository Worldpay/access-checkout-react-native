import React from 'react';
import {
  AccessCheckout,
  CvcOnlyConfig,
  CvcOnlyValidationEventListener,
  MerchantCvcOnlyValidationConfig,
} from '../../src';
import { useCvcOnlyValidation, useCvcOnlyValidationEventListener } from '../../src/hooks/useCvcOnlyValidation';
import { getMockNativeEventEmitterSubscription, isArray, isFunction } from '../test-utils';
import { renderHook } from '@testing-library/react-native';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
let useEffectCleanUpFunction: any;
jest.spyOn(React, 'useEffect').mockImplementation((f) => {
  useEffectCleanUpFunction = f();
});

describe('useCvcOnlyValidation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('useCvcOnlyValidationEventListener', () => {
    it('registers a NativeEvent listener for "AccessCheckoutCvcOnlyValidationEvent" event', () => {
      let cvcValid: boolean | undefined = undefined;
      const validationListener: CvcOnlyValidationEventListener = {
        onCvcValidChanged(isValid: boolean): void {
          cvcValid = isValid;
        },
      };

      renderHook(() => useCvcOnlyValidationEventListener(validationListener));

      const eventSubscription = getMockNativeEventEmitterSubscription();

      // Checking that event subscription has not been removed
      expect(eventSubscription.remove).not.toHaveBeenCalled();

      // Emitting a fake native event using the mock in order to check listener is correctly registered
      eventSubscription.emit('AccessCheckoutCvcOnlyValidationEvent', {
        type: 'cvc',
        isValid: true,
      });
      expect(cvcValid).toEqual(true);
    });

    it('registers the NativeEvent listener so that it is removed when useEffect cleans up', () => {
      const validationListener: CvcOnlyValidationEventListener = {};
      renderHook(() => {
        useCvcOnlyValidationEventListener(validationListener);
        // manually calling clean up function returned by useEffect in implementation
        useEffectCleanUpFunction();
      });
      const eventSubscription = getMockNativeEventEmitterSubscription();

      expect(eventSubscription.remove).toHaveBeenCalled();
    });
  });

  describe('useCvcOnlyValidation', () => {
    const validationListener: CvcOnlyValidationEventListener = {};

    const accessCheckout = new AccessCheckout({
      baseUrl: '',
      merchantId: '',
    });
    const cvcOnlyValidationConfig = new MerchantCvcOnlyValidationConfig({
      validationListener: validationListener,
    });
    const cvcOnlyConfig = new CvcOnlyConfig({
      cvcId: 'cvcInput',
      validationConfig: cvcOnlyValidationConfig,
    });

    it('returns an object with a initialiseCvcOnlyValidation property which is a function', () => {
      renderHook(() => {
        const hooksValues = useCvcOnlyValidation({
          accessCheckout,
          cvcOnlyValidationConfig: cvcOnlyConfig,
          validationListener: validationListener,
        });
        expect(isArray(hooksValues)).toEqual(false);
        expect(isFunction(hooksValues.initialiseCvcOnlyValidation)).toEqual(true);
      });
    });

    it('function returned is designed to initialise the cvc validation', () => {
      const spy = jest.spyOn(accessCheckout, 'initialiseCvcOnlyValidation');
      spy.mockResolvedValue(true);

      renderHook(() => {
        const hooksValues = useCvcOnlyValidation({
          accessCheckout,
          cvcOnlyValidationConfig: cvcOnlyConfig,
          validationListener: validationListener,
        });
        const functionReturned = hooksValues.initialiseCvcOnlyValidation;

        functionReturned();
      });

      expect(accessCheckout.initialiseCvcOnlyValidation).toHaveBeenCalledWith(cvcOnlyConfig);
    });
  });
});
