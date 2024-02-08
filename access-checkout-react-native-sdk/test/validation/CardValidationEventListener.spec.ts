import type Brand from '../../src/validation/Brand';
import type { CardValidationEventListener } from '../../src';
import { cardValidationNativeEventListenerOf } from '../../src/validation/CardValidationEventListener';

describe('CardValidationEventListener', () => {
  describe('can be instantiated', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let listener: CardValidationEventListener;

    it('with all event handlers set up', () => {
      listener = {
        onCardBrandChanged(brand?: Brand): void {
          console.log(brand);
        },
        onPanValidChanged(isValid: boolean): void {
          console.log(isValid);
        },
        onExpiryDateValidChanged(isValid: boolean): void {
          console.log(isValid);
        },
        onCvcValidChanged(isValid: boolean): void {
          console.log(isValid);
        },
        // eslint-disable-next-line  @typescript-eslint/no-empty-function
        onValidationSuccess() {},
      };
    });

    it('without an event handler for card brand changes', () => {
      listener = {
        onPanValidChanged(isValid: boolean): void {
          console.log(isValid);
        },
        onExpiryDateValidChanged(isValid: boolean): void {
          console.log(isValid);
        },
        onCvcValidChanged(isValid: boolean): void {
          console.log(isValid);
        },
        // eslint-disable-next-line  @typescript-eslint/no-empty-function
        onValidationSuccess() {},
      };
    });

    it('without an event handler for pan validation state changes', () => {
      listener = {
        onExpiryDateValidChanged(isValid: boolean): void {
          console.log(isValid);
        },
        onCvcValidChanged(isValid: boolean): void {
          console.log(isValid);
        },
        // eslint-disable-next-line  @typescript-eslint/no-empty-function
        onValidationSuccess() {},
      };
    });

    it('without an event handler for expiry date validation state changes', () => {
      listener = {
        onCvcValidChanged(isValid: boolean): void {
          console.log(isValid);
        },
        // eslint-disable-next-line  @typescript-eslint/no-empty-function
        onValidationSuccess() {},
      };
    });

    it('without an event handler for cvc validation state changes', () => {
      listener = {
        // eslint-disable-next-line  @typescript-eslint/no-empty-function
        onValidationSuccess() {},
      };
    });

    it('without an event handler for all fields valid', () => {
      // eslint-disable-next-line  @typescript-eslint/no-unused-vars
      listener = {};
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
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      const event: any = {
        type: 'brand',
        value: brand,
      };
      functionReturned(event);

      expect(cardBrandReceived).toEqual(brand);
    });

    it('with undefined when no card brand detected', () => {
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      const event: any = {
        type: 'pan',
        isValid: true,
      };
      functionReturned(event);

      expect(panIsValid).toEqual(true);
    });

    it('and passes false when pan is not valid', () => {
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      const event: any = {
        type: 'expiryDate',
        isValid: true,
      };
      functionReturned(event);

      expect(expiryDateIsValid).toEqual(true);
    });

    it('and passes false when expiry date is not valid', () => {
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      const event: any = {
        type: 'cvc',
        isValid: true,
      };
      functionReturned(event);

      expect(cvcIsValid).toEqual(true);
    });

    it('and passes false when cvc is not valid', () => {
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      const event: any = {
        type: 'cvc',
        isValid: false,
      };
      functionReturned(event);

      expect(cvcIsValid).toEqual(false);
    });
  });

  it('delegates validation success to CardValidationEventListener onValidationSuccess', () => {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const event: any = {
      type: 'all',
      isValid: true,
    };
    functionReturned(event);

    expect(validationSuccess).toEqual(true);
  });
});
