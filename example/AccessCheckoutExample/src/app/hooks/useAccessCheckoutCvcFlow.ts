import {useState} from 'react';
import {
  CVC,
  CvcOnlyValidationEventListener,
  Sessions,
  useAccessCheckout,
  useCvcOnlyConfig,
} from '@worldpay/access-worldpay-checkout-react-native-sdk';

export interface UseAccessCheckoutExports {
  initialiseValidation: () => Promise<boolean>;
  generateSessions: (sessionTypes: string[]) => Promise<Sessions>;
}

export interface useAccessCheckoutCardFlow {
  baseUrl: string;
  checkoutId: string;
  config: {
    cvcId: string;
  };
}

export const useAccessCheckoutCvcOnlyFlow = ({
  baseUrl,
  checkoutId,
  config,
}: useAccessCheckoutCardFlow): any => {
  const [cvcIsValid, setCvcIsValid] = useState<boolean>();

  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [cvcSession, setCvcSession] = useState<string>();

  const [error, setError] = useState<Error>();

  const validationEventListener: CvcOnlyValidationEventListener = {
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
    config: useCvcOnlyConfig({
      cvcId: config.cvcId,
      validationConfig: {
        validationListener: validationEventListener,
      },
    }),
  });

  const generateSessionsWithLoadingState = () => {
    setIsLoading(true);
    generateSessions([CVC])
      .then((sessions: Sessions) => {
        console.info('Successfully generated CVC session');

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
        console.info('CVC Validation successfully initialised');
      })
      .catch(e => {
        setError(e);
      });
  };
  return {
    initialiseValidation: initialiseValidationWithError,
    generateSessions: generateSessionsWithLoadingState,
    cvcSession,
    cvcIsValid,
    canSubmit,
    error,
    isLoading,
  };
};
