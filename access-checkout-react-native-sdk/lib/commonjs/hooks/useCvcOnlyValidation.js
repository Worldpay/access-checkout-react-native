"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCvcOnlyValidationEventListener = exports.useCvcOnlyValidation = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _CvcOnlyValidationEventListener = require("../validation/CvcOnlyValidationEventListener");
var _ValidationListenerException = require("../validation/ValidationListenerException");
var _AccessCheckoutReactNative = require("../AccessCheckoutReactNative");
var _AccessCheckout = _interopRequireDefault(require("../AccessCheckout"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const useCvcOnlyValidationEventListener = validationListener => {
  (0, _react.useEffect)(() => {
    //Safe-guard in the case where no validation listener was configured we avoid registering the native listener
    if (!validationListener) {
      return;
    }
    const nativeEventListener = (0, _CvcOnlyValidationEventListener.cvcOnlyValidationNativeEventListenerOf)(validationListener);
    const nativeEventEmitter = new _reactNative.NativeEventEmitter(_AccessCheckoutReactNative.AccessCheckoutReactNative);
    const eventSubscription = nativeEventEmitter.addListener(_AccessCheckout.default.CvcOnlyValidationEventType, nativeEventListener);
    return () => {
      eventSubscription.remove();
    };
  }, []);
};
exports.useCvcOnlyValidationEventListener = useCvcOnlyValidationEventListener;
const useCvcOnlyValidation = ({
  accessCheckout,
  cvcOnlyValidationConfig,
  validationListener
}) => {
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
      throw new _ValidationListenerException.ValidationListenerException();
    }
    return accessCheckout.initialiseCvcOnlyValidation(cvcOnlyValidationConfig);
  };
  return {
    initialiseCvcOnlyValidation
  };
};
exports.useCvcOnlyValidation = useCvcOnlyValidation;
//# sourceMappingURL=useCvcOnlyValidation.js.map