"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardValidationNativeEventListenerOf = cardValidationNativeEventListenerOf;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function cardValidationNativeEventListenerOf(delegate) {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
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