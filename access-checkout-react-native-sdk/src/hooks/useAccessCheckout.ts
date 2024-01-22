import {
  AccessCheckout,
  CardConfig,
  type CardValidationEventListener,
  CvcOnlyConfig,
  CvcOnlyValidationEventListener,
  Sessions,
} from '../index';
import { useCardValidation } from './useCardValidation';
import { useCvcOnlyValidation } from './useCvcOnlyValidation';

export interface UseAccessCheckoutExports {
  initialiseValidation: () => Promise<boolean>;
  generateSessions: (sessionTypes: string[]) => Promise<Sessions>;
}

export interface UseAccessCheckout {
  baseUrl: string;
  checkoutId: string;
  config: CardConfig | CvcOnlyConfig;
}

export const useAccessCheckout = ({ baseUrl, checkoutId, config }: UseAccessCheckout): UseAccessCheckoutExports => {
  const accessCheckout = new AccessCheckout({
    baseUrl: baseUrl,
    merchantId: checkoutId,
  });

  /**
   * Implementation note: Decided to use classes to benefit from instance checking.
   * If using interfaces or types a "type guard" could have been used. the trade off being having to check for
   * a specific property that would be unique to that interface/type which in theory it introduces another point of
   * failure if the property was to be renamed and not updated in the type guard.
   */
  if (config instanceof CardConfig) {
    const { initialiseCardValidation } = useCardValidation({
      accessCheckout,
      cardValidationConfig: {
        panId: config.panId,
        expiryDateId: config.expiryDateId,
        cvcId: config.cvcId,
        enablePanFormatting: config.validationConfig?.enablePanFormatting,
        acceptedCardBrands: config.validationConfig?.acceptedCardBrands,
      },
      validationListener: config.validationConfig?.validationListener as CardValidationEventListener,
    });

    const generateSessions = (sessionTypes: string[]) =>
      accessCheckout.generateSessions(
        {
          panId: config.panId,
          expiryDateId: config.expiryDateId,
          cvcId: config.cvcId,
        },
        sessionTypes
      );

    return {
      initialiseValidation: initialiseCardValidation,
      generateSessions,
    };
  } else {
    const { initialiseCvcOnlyValidation } = useCvcOnlyValidation({
      accessCheckout,
      cvcOnlyValidationConfig: { cvcId: config.cvcId },
      validationListener: config.validationConfig?.validationListener as CvcOnlyValidationEventListener,
    });

    const generateCvcOnlySession = (sessionTypes: string[]) =>
      accessCheckout.generateSessions(
        {
          cvcId: config.cvcId,
        },
        sessionTypes
      );

    return {
      initialiseValidation: initialiseCvcOnlyValidation,
      generateSessions: generateCvcOnlySession,
    };
  }
};
