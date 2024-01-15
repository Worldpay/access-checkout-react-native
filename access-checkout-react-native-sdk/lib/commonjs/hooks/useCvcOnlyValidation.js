"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCvcOnlyValidationEventListener = exports.useCvcOnlyValidation = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = _interopRequireWildcard(require("../index"));
var _CvcOnlyValidationEventListener = require("../validation/CvcOnlyValidationEventListener");
var _ValidationListenerException = require("../validation/ValidationListenerException");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useCvcOnlyValidationEventListener = validationListener => {
  (0, _react.useEffect)(() => {
    //Safe-guard in the case where no validation listener was configured we avoid registering the native listener
    if (!validationListener) {
      return;
    }
    const nativeEventListener = (0, _CvcOnlyValidationEventListener.cvcOnlyValidationNativeEventListenerOf)(validationListener);
    const nativeEventEmitter = new _reactNative.NativeEventEmitter(_index.default);
    const eventSubscription = nativeEventEmitter.addListener(_index.AccessCheckout.CvcOnlyValidationEventType, nativeEventListener);
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
  `useCvcOnlyValidationEventListener` has a safe-guard inside it's useEffect to check if a validationListener
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