// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export interface CvcValidationEventListener {
  onCvcValidChanged?(isValid: boolean): void;

  onValidationSuccess?(): void;
}
export function cvcValidationNativeEventListenerOf(
  delegate: CvcValidationEventListener
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
