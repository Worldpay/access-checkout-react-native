// @ts-ignore
import { Brand } from '../../src/validation/Brand';
import {
  CardValidationEventListener,
  cardValidationNativeEventListenerOf,
} from '../../src';

describe('CardValidationEventListener', () => {
  describe('can be instantiated', () => {
    it('with all event handlers set up', () => {
      // @ts-ignore
      const listener: CardValidationEventListener = {
        // @ts-ignore
        onCardBrandChanged(brand?: Brand): void {
        },
        // @ts-ignore
        onPanValidChanged(isValid: boolean): void {
        },
        // @ts-ignore
        onExpiryDateValidChanged(isValid: boolean): void {
        },
        // @ts-ignore
        onCvcValidChanged(isValid: boolean): void {
        },
        onValidationSuccess() {
        },
      };
    });

    it('without an event handler for card brand changes', () => {
      // @ts-ignore
      const listener: CardValidationEventListener = {
        // @ts-ignore
        onPanValidChanged(isValid: boolean): void {
        },
        // @ts-ignore
        onExpiryDateValidChanged(isValid: boolean): void {
        },
        // @ts-ignore
        onCvcValidChanged(isValid: boolean): void {
        },
        onValidationSuccess() {
        },
      };
    });

    it('without an event handler for pan validation state changes', () => {
      // @ts-ignore
      const listener: CardValidationEventListener = {
        // @ts-ignore
        onExpiryDateValidChanged(isValid: boolean): void {
        },
        // @ts-ignore
        onCvcValidChanged(isValid: boolean): void {
        },
        onValidationSuccess() {
        },
      };
    });

    it('without an event handler for expiry date validation state changes', () => {
      // @ts-ignore
      const listener: CardValidationEventListener = {
        // @ts-ignore
        onCvcValidChanged(isValid: boolean): void {
        },
        onValidationSuccess() {
        },
      };
    });

    it('without an event handler for cvc validation state changes', () => {
      // @ts-ignore
      const listener: CardValidationEventListener = {
        onValidationSuccess() {
        },
      };
    });

    it('without an event handler for all fields valid', () => {
      // @ts-ignore
      const listener: CardValidationEventListener = {};
    });
  });

  describe('when wired using cardValidationNativeEventListenerOf()', () => {
    it('has onCardBrandChanged() method called when native event is brand with brand details', () => {
    });
  });
});

describe('cardValidationNativeEventListenerOf() returns a function which', () => {
  let cardBrandReceived: Brand | undefined;
  let panIsValid: boolean | undefined;
  let expiryDateIsValid: boolean | undefined;
  let cvcIsValid: boolean | undefined;
  let validationSuccess: boolean | undefined;

  const listener: CardValidationEventListener = {
    onCardBrandChanged(brand?: Brand): void {
      cardBrandReceived = brand;
    },
    onPanValidChanged(isValid: boolean): void {
      panIsValid = isValid;
    },
    onExpiryDateValidChanged(isValid: boolean): void {
      expiryDateIsValid = isValid;
    },
    onCvcValidChanged(isValid: boolean): void {
      cvcIsValid = isValid;
    },
    onValidationSuccess(): void {
      validationSuccess = true;
    },
  };

  const functionReturned = cardValidationNativeEventListenerOf(listener);

  describe('delegates card brand native event to CardValidationEventListener onCardBrandChanged', () => {
    it('with card brand details when card brand has been detected', () => {
      const brand: Brand = {
        name: 'visa',
        images: [],
      };
      const event: any = {
        type: 'brand',
        value: brand,
      };
      functionReturned(event);

      expect(cardBrandReceived).toEqual(brand);
    });

    it('with undefined when no card brand detected', () => {
      const event: any = {
        type: 'brand',
        value: null,
      };
      functionReturned(event);

      expect(cardBrandReceived).toBeUndefined();
    });
  });

  describe('delegates pan valid state change to CardValidationEventListener onPanValidChanged', () => {
    it('and passes true when pan is valid', () => {
      const event: any = {
        type: 'pan',
        isValid: true,
      };
      functionReturned(event);

      expect(panIsValid).toEqual(true);
    });

    it('and passes false when pan is not valid', () => {
      const event: any = {
        type: 'pan',
        isValid: false,
      };
      functionReturned(event);

      expect(panIsValid).toEqual(false);
    });
  });

  describe('delegates expiry date valid state change to CardValidationEventListener onExpiryDateValidChanged', () => {
    it('and passes true when expiry date is valid', () => {
      const event: any = {
        type: 'expiryDate',
        isValid: true,
      };
      functionReturned(event);

      expect(expiryDateIsValid).toEqual(true);
    });

    it('and passes false when expiry date is not valid', () => {
      const event: any = {
        type: 'expiryDate',
        isValid: false,
      };
      functionReturned(event);

      expect(expiryDateIsValid).toEqual(false);
    });
  });

  describe('delegates cvc valid state change to CardValidationEventListener onCvcValidChanged', () => {
    it('and passes true when cvc is valid', () => {
      const event: any = {
        type: 'cvc',
        isValid: true,
      };
      functionReturned(event);

      expect(cvcIsValid).toEqual(true);
    });

    it('and passes false when cvc is not valid', () => {
      const event: any = {
        type: 'cvc',
        isValid: false,
      };
      functionReturned(event);

      expect(cvcIsValid).toEqual(false);
    });
  });

  it('delegates validation success to CardValidationEventListener onValidationSuccess', () => {
    const event: any = {
      type: 'all',
      isValid: true,
    };
    functionReturned(event);

    expect(validationSuccess).toEqual(true);
  });
});
