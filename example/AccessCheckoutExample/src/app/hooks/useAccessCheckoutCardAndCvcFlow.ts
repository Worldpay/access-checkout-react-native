import {useState} from 'react';
import {
  Brand,
  CARD,
  CardValidationEventListener,
  CVC,
  Sessions,
  useAccessCheckout,
  useCardConfig,
} from '@worldpay/access-worldpay-checkout-react-native-sdk';

export interface UseAccessCheckoutExports {
  initialiseValidation: () => Promise<boolean>;
  generateSessions: (sessionTypes: string[]) => Promise<Sessions>;
}

export interface useAccessCheckoutCardFlow {
  baseUrl: string;
  checkoutId: string;
  config: {
    panId: string;
    expiryDateId: string;
    cvcId: string;
    enablePanFormatting: boolean;
  };
}

export const useAccessCheckoutCardAndCvcFlow = ({
  baseUrl,
  checkoutId,
  config,
}: useAccessCheckoutCardFlow): any => {
  const [brand, setBrand] = useState<Brand>();
  const [panIsValid, setPanIsValid] = useState<boolean>();
  const [expiryIsValid, setExpiryIsValid] = useState<boolean>();
  const [cvcIsValid, setCvcIsValid] = useState<boolean>();

  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [cardSession, setCardSession] = useState<string>();
  const [cvcSession, setCvcSession] = useState<string>();

  const [error, setError] = useState<Error>();

  const validationEventListener: CardValidationEventListener = {
    onCardBrandChanged(brand?: Brand): void {
      brand ? setBrand(brand) : setBrand(undefined);
    },

    onPanValidChanged(isValid: boolean): void {
      setPanIsValid(isValid);
      if (!isValid) {
        setCanSubmit(false);
      }
    },

    onExpiryDateValidChanged(isValid: boolean): void {
      setExpiryIsValid(isValid);
      if (!isValid) {
        setCanSubmit(false);
      }
    },

    onCvcValidChanged(isValid: boolean): void {
      setCvcIsValid(isValid);
      if (!isValid) {
        setCanSubmit(false);
      }
    },

    onValidationSuccess() {
      setCanSubmit(true);
    },
  };

  const {initialiseValidation, generateSessions} = useAccessCheckout({
    baseUrl,
    checkoutId,
    config: useCardConfig({
      panId: config.panId,
      expiryDateId: config.expiryDateId,
      cvcId: config.cvcId,
      validationConfig: {
        enablePanFormatting: config.enablePanFormatting,
        validationListener: validationEventListener,
      },
    }),
  });

  const generateSessionsWithLoadingState = () => {
    setIsLoading(true);
    generateSessions([CARD, CVC])
      .then((sessions: Sessions) => {
        console.info('Successfully generated Card and CVC sessions');

        setCardSession(sessions.card);
        setCvcSession(sessions.cvc);
      })
      .catch(e => {
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const initialiseValidationWithError = () => {
    initialiseValidation()
      .then(() => {
        console.info('Card And Cvc Validation successfully initialised');
      })
      .catch(e => {
        setError(e);
      });
  };
  return {
    initialiseValidation: initialiseValidationWithError,
    generateSessions: generateSessionsWithLoadingState,
    cardSession,
    cvcSession,
    brand,
    panIsValid,
    expiryIsValid,
    cvcIsValid,
    canSubmit,
    error,
    isLoading,
  };
};
