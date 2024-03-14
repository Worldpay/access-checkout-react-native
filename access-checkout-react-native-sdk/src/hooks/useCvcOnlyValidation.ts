import { useEffect } from 'react';
import { NativeEventEmitter } from 'react-native';
import type { CvcOnlyValidationEventListener } from '../validation/CvcOnlyValidationEventListener';
import { cvcOnlyValidationNativeEventListenerOf } from '../validation/CvcOnlyValidationEventListener';
import { ValidationListenerException } from '../validation/ValidationListenerException';
import { AccessCheckoutReactNative } from '../AccessCheckoutReactNative';
import AccessCheckout from '../AccessCheckout';
import type { CardValidationEventListener } from '../validation/CardValidationEventListener';

export const useCvcOnlyValidationEventListener = (validationListener: CvcOnlyValidationEventListener) => {
  useEffect(() => {
    //Safe-guard in the case where no validation listener was configured we avoid registering the native listener
    if (!validationListener) {
      return;
    }

    const nativeEventListener = cvcOnlyValidationNativeEventListenerOf(validationListener);
    const nativeEventEmitter = new NativeEventEmitter(AccessCheckoutReactNative);

    const eventSubscription = nativeEventEmitter.addListener(
      AccessCheckout.CvcOnlyValidationEventType,
      nativeEventListener
    );

    return () => {
      eventSubscription.remove();
    };
  }, []);
};

interface UseCvcOnlyValidationHook {
  accessCheckout: AccessCheckout;
  cvcOnlyValidationConfig: {
    cvcId: string;
  };
  validationListener: CardValidationEventListener;
}

export const useCvcOnlyValidation = ({
  accessCheckout,
  cvcOnlyValidationConfig,
  validationListener,
}: UseCvcOnlyValidationHook) => {
  /*
  Implementation Note: To allow the hook to render and use hooks correctly:
  `useCvcOnlyValidationEventListener` has a safe-guard inside its useEffect to check if a validationListener
  was provided in order to register the native event.
  */
  useCvcOnlyValidationEventListener(validationListener);
  const initialiseCvcOnlyValidation = () => {
    /*
    Implementation Note: Since we do not block the rendering of the hook to allow for `validationConfig` to be optional.
    We added a safe-guard that will raise a ValidationListenerException which prevents the
    `initialiseCvcOnlyValidation` method from being called when no validationConfig is provided.
    This provides the developers with a clear readable error message and enhances their debugging experience.
    */
    if (!validationListener) {
      throw new ValidationListenerException();
    }

    return accessCheckout.initialiseCvcOnlyValidation(cvcOnlyValidationConfig);
  };

  return { initialiseCvcOnlyValidation };
};
