"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCardValidation = useCardValidation;
exports.useCardValidationEventListener = useCardValidationEventListener;
var _react = require("react");
var _reactNative = require("react-native");
var _AccessCheckout = _interopRequireDefault(require("../AccessCheckout"));
var _AccessCheckoutReactNative = _interopRequireDefault(require("../AccessCheckoutReactNative"));
var _CardValidationEventListener = require("../validation/CardValidationEventListener");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function useCardValidationEventListener(merchantListener) {
  (0, _react.useEffect)(() => {
    const nativeEventListener = (0, _CardValidationEventListener.cardValidationNativeEventListenerOf)(merchantListener);
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
  merchantListener
}) {
  useCardValidationEventListener(merchantListener);
  const initialiseCardValidation = () => {
    return accessCheckout.initialiseCardValidation(cardValidationConfig);
  };
  return {
    initialiseCardValidation
  };
}
//# sourceMappingURL=useCardValidation.js.map