import React from 'react';
import {
  AccessCheckout,
  CvcOnlyValidationConfig,
  CvcOnlyValidationEventListener,
} from '../../src';
import {
  useCvcOnlyValidationEventListener,
  useCvcOnlyValidation,
} from '../../src/validation/CvcOnlyValidationHooks';
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

describe('CvcOnlyValidationHooks', function () {
  describe('useCvcOnlyValidationEventListener', () => {
    it('registers a NativeEvent listener for "AccessCheckoutCvcOnlyValidationEvent" event', () => {
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      let cvcValid: any = undefined;
      const merchantListener: CvcOnlyValidationEventListener = {
        onCvcValidChanged(isValid: boolean): void {
          cvcValid = isValid;
        },
      };

      useCvcOnlyValidationEventListener(merchantListener);

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
      const merchantListener: CvcOnlyValidationEventListener = {};
      useCvcOnlyValidationEventListener(merchantListener);

      // manually calling clean up function returned by useEffect in implementation
      useEffectCleanUpFunction();

      expect(nativeEventSubscriptionMock.remove).toHaveBeenCalled();
    });
  });

  describe('useCvcOnlyValidation', () => {
    const merchantListener: CvcOnlyValidationEventListener = {};

    const accessCheckout = new AccessCheckout({
      baseUrl: '',
      merchantId: '',
    });
    const validationConfig = new CvcOnlyValidationConfig({
      cvcId: 'cvcInput',
    });

    it('returns an object with a initialiseCvcOnlyValidation property which is a function', () => {
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      const hooksValues: any = useCvcOnlyValidation(
        accessCheckout,
        validationConfig,
        merchantListener
      );

      expect(isArray(hooksValues)).toEqual(false);
      expect(isFunction(hooksValues.initialiseCvcOnlyValidation)).toEqual(true);
    });

    it('function returned is designed to initialise the cvc validation', () => {
      jest.spyOn(accessCheckout, 'initialiseCvcOnlyValidation');

      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      const hooksValues: any = useCvcOnlyValidation(
        accessCheckout,
        validationConfig,
        merchantListener
      );
      const functionReturned = hooksValues.initialiseCvcOnlyValidation;

      functionReturned();

      expect(accessCheckout.initialiseCvcOnlyValidation).toHaveBeenCalledWith(
        validationConfig
      );
    });
  });
});
