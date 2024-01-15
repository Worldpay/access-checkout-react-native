import { useEffect } from 'react';
import { NativeEventEmitter } from 'react-native';
import AccessCheckout from '../AccessCheckout';
import AccessCheckoutReactNative from '../AccessCheckoutReactNative';
import { cardValidationNativeEventListenerOf } from '../validation/CardValidationEventListener';
import { ValidationListenerException } from '../validation/ValidationListenerException';
export function useCardValidationEventListener(validationListener) {
  useEffect(() => {
    //Safe-guard in the case where no validation listener was configured we avoid registering the native listener
    if (!validationListener) {
      return;
    }
    const nativeEventListener = cardValidationNativeEventListenerOf(validationListener);
    const nativeEventEmitter = new NativeEventEmitter(AccessCheckoutReactNative);
    const eventSubscription = nativeEventEmitter.addListener(AccessCheckout.CardValidationEventType, nativeEventListener);
    return () => {
      eventSubscription.remove();
    };
  }, []);
}
export function useCardValidation({
  accessCheckout,
  cardValidationConfig,
  validationListener
}) {
  /*
  Implementation Note: To allow the hook to render and use hooks correctly:
  `useCardValidationEventListener` has a safe-guard inside it's useEffect to check if a validationListener
  was provided in order to register the native event.
  */
  useCardValidationEventListener(validationListener);
  const initialiseCardValidation = () => {
    /*
    Implementation Note: Since we do not block the rendering of the hook to allow for `validationConfig` to be optional.
    We added a safe-guard that will raise a ValidationListenerException which prevents the
    `initialiseCardValidation` method from being called when no validationConfig is provided.
    This provides the developers with a clear readable error message and enhances their debugging experience.
     */
    if (!validationListener) {
      throw new ValidationListenerException();
    }
    return accessCheckout.initialiseCardValidation(cardValidationConfig);
  };
  return {
    initialiseCardValidation
  };
}
//# sourceMappingURL=useCardValidation.js.map