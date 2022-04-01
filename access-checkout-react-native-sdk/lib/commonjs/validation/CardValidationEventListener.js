"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardValidationNativeEventListenerOf = cardValidationNativeEventListenerOf;

// @ts-ignore
function cardValidationNativeEventListenerOf(delegate) {
  return function (event) {
    if (event.type === 'brand' && delegate.onCardBrandChanged) {
      if (event.value === null) {
        delegate.onCardBrandChanged();
      } else {
        delegate.onCardBrandChanged(event.value);
      }
    }

    if (event.type === 'pan' && delegate.onPanValidChanged) {
      delegate.onPanValidChanged(event.isValid);
    }

    if (event.type === 'expiryDate' && delegate.onExpiryDateValidChanged) {
      delegate.onExpiryDateValidChanged(event.isValid);
    }

    if (event.type === 'cvc' && delegate.onCvcValidChanged) {
      delegate.onCvcValidChanged(event.isValid);
    }

    if (event.type === 'all' && delegate.onValidationSuccess) {
      delegate.onValidationSuccess();
    }
  };
}
//# sourceMappingURL=CardValidationEventListener.js.map