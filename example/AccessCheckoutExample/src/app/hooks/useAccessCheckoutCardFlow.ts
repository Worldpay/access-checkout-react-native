import {useState} from 'react';
import {
  Brand,
  CARD,
  CardValidationEventListener,
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

// export const useAccessCheckout = ({ baseUrl, checkoutId, config }: UseAccessCheckout): UseAccessCheckoutExports => {

export const useAccessCheckoutCardFlow = ({
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
    generateSessions([CARD])
      .then((sessions: Sessions) => {
        console.info('Successfully generated Card session');

        setCardSession(sessions.card);
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
        console.info('Card Validation successfully initialised');
      })
      .catch(e => {
        setError(e);
      });
  };
  return {
    initialiseValidation: initialiseValidationWithError,
    generateSessions: generateSessionsWithLoadingState,
    cardSession,
    brand,
    panIsValid,
    expiryIsValid,
    cvcIsValid,
    canSubmit,
    error,
    isLoading,
  };
};
