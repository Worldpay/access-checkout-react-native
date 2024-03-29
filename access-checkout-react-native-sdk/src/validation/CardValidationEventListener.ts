// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Brand from './Brand';

export interface CardValidationEventListener {
  onCardBrandChanged?(brand?: Brand): void;

  onPanValidChanged?(isValid: boolean): void;

  onExpiryDateValidChanged?(isValid: boolean): void;

  onCvcValidChanged?(isValid: boolean): void;

  onValidationSuccess?(): void;
}

export function cardValidationNativeEventListenerOf(delegate: CardValidationEventListener) {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  return function (event: any) {
    if (event.type === 'brand' && delegate.onCardBrandChanged) {
      if (event.value === null) {
        delegate.onCardBrandChanged();
      } else {
        delegate.onCardBrandChanged(event.value as Brand);
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
