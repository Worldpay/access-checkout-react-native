export function cvcOnlyValidationNativeEventListenerOf(delegate) {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  return function (event) {
    if (event.type === 'cvc' && delegate.onCvcValidChanged) {
      delegate.onCvcValidChanged(event.isValid);
    }
    if (event.type === 'all' && delegate.onValidationSuccess) {
      delegate.onValidationSuccess();
    }
  };
}
//# sourceMappingURL=CvcOnlyValidationEventListener.js.map