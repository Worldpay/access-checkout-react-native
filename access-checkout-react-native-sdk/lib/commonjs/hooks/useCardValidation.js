"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCardValidation = useCardValidation;
exports.useCardValidationEventListener = useCardValidationEventListener;
var _react = require("react");
var _AccessCheckout = _interopRequireDefault(require("../AccessCheckout"));
var _AccessCheckoutReactNative = _interopRequireDefault(require("../AccessCheckoutReactNative"));
var _CardValidationEventListener = require("../validation/CardValidationEventListener");
var _ValidationListenerException = require("../validation/ValidationListenerException");
var _reactNative = require("react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function useCardValidationEventListener(validationListener) {
  (0, _react.useEffect)(() => {
    //Safe-guard in the case where no validation listener was configured we avoid registering the native listener
    if (!validationListener) {
      return;
    }
    const nativeEventListener = (0, _CardValidationEventListener.cardValidationNativeEventListenerOf)(validationListener);
    const nativeEventEmitter = new _reactNative.NativeEventEmitter(_AccessCheckoutReactNative.default);
    const eventSubscription = nativeEventEmitter.addListener(_AccessCheckout.default.CardValidationEventType, nativeEventListener);
    return () => {
      eventSubscription.remove();
    };
  }, []);
}
function useCardValidation({
  accessCheckout,
  cardValidationConfig,
  validationListener
}) {
  /*
  Implementation Note: To allow the hook to render and use hooks correctly:
  `useCardValidationEventListener` has a safe-guard inside its useEffect to check if a validationListener
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
      throw new _ValidationListenerException.ValidationListenerException();
    }
    return accessCheckout.initialiseCardValidation(cardValidationConfig);
  };
  return {
    initialiseCardValidation
  };
}
//# sourceMappingURL=useCardValidation.js.map