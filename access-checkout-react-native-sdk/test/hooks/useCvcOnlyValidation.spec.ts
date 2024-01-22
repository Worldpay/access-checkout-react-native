import React from 'react';
import {
  AccessCheckout,
  CvcOnlyConfig,
  CvcOnlyValidationEventListener,
  MerchantCvcOnlyValidationConfig,
} from '../../src';
import { useCvcOnlyValidation, useCvcOnlyValidationEventListener } from '../../src/hooks/useCvcOnlyValidation';
import { emitNativeEvent, nativeEventSubscriptionMock } from '../__mocks__/react-native';
import { isArray, isFunction } from '../test-utils';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
let useEffectCleanUpFunction: any;
jest.spyOn(React, 'useEffect').mockImplementation((f) => {
  useEffectCleanUpFunction = f();
});

describe('useCvcOnlyValidation', () => {
  describe('useCvcOnlyValidationEventListener', () => {
    it('registers a NativeEvent listener for "AccessCheckoutCvcOnlyValidationEvent" event', () => {
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      let cvcValid: any = undefined;
      const validationListener: CvcOnlyValidationEventListener = {
        onCvcValidChanged(isValid: boolean): void {
          cvcValid = isValid;
        },
      };

      useCvcOnlyValidationEventListener(validationListener);

      // Emitting a fake native event using the mock in order to check listener is correctly registered
      emitNativeEvent('AccessCheckoutCvcOnlyValidationEvent', {
        type: 'cvc',
        isValid: true,
      });
      expect(cvcValid).toEqual(true);

      // Checking that event subscription has not been removed
      expect(nativeEventSubscriptionMock.remove).not.toHaveBeenCalled();
    });

    it('registers the NativeEvent listener so that it is removed when useEffect cleans up', () => {
      const validationListener: CvcOnlyValidationEventListener = {};
      useCvcOnlyValidationEventListener(validationListener);

      // manually calling clean up function returned by useEffect in implementation
      useEffectCleanUpFunction();

      expect(nativeEventSubscriptionMock.remove).toHaveBeenCalled();
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
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      const hooksValues: any = useCvcOnlyValidation({
        accessCheckout,
        cvcOnlyValidationConfig: cvcOnlyConfig,
        validationListener: validationListener,
      });

      expect(isArray(hooksValues)).toEqual(false);
      expect(isFunction(hooksValues.initialiseCvcOnlyValidation)).toEqual(true);
    });

    it('function returned is designed to initialise the cvc validation', () => {
      const spy = jest.spyOn(accessCheckout, 'initialiseCvcOnlyValidation');
      spy.mockResolvedValue(true);

      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      const hooksValues: any = useCvcOnlyValidation({
        accessCheckout,
        cvcOnlyValidationConfig: cvcOnlyConfig,
        validationListener: validationListener,
      });
      const functionReturned = hooksValues.initialiseCvcOnlyValidation;

      functionReturned();

      expect(accessCheckout.initialiseCvcOnlyValidation).toHaveBeenCalledWith(cvcOnlyConfig);
    });
  });
});
