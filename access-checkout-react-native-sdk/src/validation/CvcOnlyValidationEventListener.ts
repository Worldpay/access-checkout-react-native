export interface CvcOnlyValidationEventListener {
  onCvcValidChanged?(isValid: boolean): void;

  onValidationSuccess?(): void;
}

export function cvcOnlyValidationNativeEventListenerOf(
  delegate: CvcOnlyValidationEventListener
) {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  return function (event: any) {
    if (event.type === 'cvc' && delegate.onCvcValidChanged) {
      delegate.onCvcValidChanged(event.isValid);
    }

    if (event.type === 'all' && delegate.onValidationSuccess) {
      delegate.onValidationSuccess();
    }
  };
}
