"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCvcOnlyValidation = useCvcOnlyValidation;
exports.useCvcOnlyValidationEventListener = useCvcOnlyValidationEventListener;

var _react = require("react");

var _reactNative = require("react-native");

var _index = _interopRequireWildcard(require("../index"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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