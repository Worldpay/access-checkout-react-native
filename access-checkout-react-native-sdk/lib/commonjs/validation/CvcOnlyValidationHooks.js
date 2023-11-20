"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCvcOnlyValidation = useCvcOnlyValidation;
exports.useCvcOnlyValidationEventListener = useCvcOnlyValidationEventListener;
var _react = require("react");
var _reactNative = require("react-native");
var _index = _interopRequireWildcard(require("../index"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
// @ts-ignore

function useCvcOnlyValidationEventListener(merchantListener) {
  (0, _react.useEffect)(() => {
    const nativeEventListener = (0, _index.cvcOnlyValidationNativeEventListenerOf)(merchantListener);
    const nativeEventEmitter = new _reactNative.NativeEventEmitter(_index.default);
    const eventSubscription = nativeEventEmitter.addListener(_index.AccessCheckout.CvcOnlyValidationEventType, nativeEventListener);
    return () => {
      eventSubscription.remove();
    };
  }, []);
}
function useCvcOnlyValidation(accessCheckout, cvcOnlyValidationConfig, merchantListener) {
  useCvcOnlyValidationEventListener(merchantListener);
  const initialiseCvcOnlyValidation = () => {
    return accessCheckout.initialiseCvcOnlyValidation(cvcOnlyValidationConfig);
  };
  return {
    initialiseCvcOnlyValidation
  };
}
//# sourceMappingURL=CvcOnlyValidationHooks.js.map