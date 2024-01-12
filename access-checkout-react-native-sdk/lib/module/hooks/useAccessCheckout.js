import { AccessCheckout, CardConfig } from '../index';
import { useCardValidation } from './useCardValidation';
import { useCvcOnlyValidation } from './useCvcOnlyValidation';
export const useAccessCheckout = ({
  baseUrl,
  checkoutId,
  config
}) => {
  const accessCheckout = new AccessCheckout({
    baseUrl: baseUrl,
    merchantId: checkoutId
  });

  /**
   * Implementation note: Decided to use classes to benefit from instance checking.
   * If using interfaces or types a "type guard" could have been used. the trade off being having to check for
   * a specific property that would be unique to that interface/type which in theory it introduces another point of
   * failure if the property was to be renamed and not updated in the type guard.
   */
  if (config instanceof CardConfig) {
    var _config$validationCon, _config$validationCon2, _config$validationCon3;
    const {
      initialiseCardValidation
    } = useCardValidation({
      accessCheckout,
      cardValidationConfig: {
        panId: config.panId,
        expiryDateId: config.expiryDateId,
        cvcId: config.cvcId,
        enablePanFormatting: (_config$validationCon = config.validationConfig) === null || _config$validationCon === void 0 ? void 0 : _config$validationCon.enablePanFormatting,
        acceptedCardBrands: (_config$validationCon2 = config.validationConfig) === null || _config$validationCon2 === void 0 ? void 0 : _config$validationCon2.acceptedCardBrands
      },
      merchantListener: (_config$validationCon3 = config.validationConfig) === null || _config$validationCon3 === void 0 ? void 0 : _config$validationCon3.validationListener
    });
    const generateSessions = sessionTypes => accessCheckout.generateSessions({
      panId: config.panId,
      expiryDateId: config.expiryDateId,
      cvcId: config.cvcId
    }, sessionTypes);
    return {
      initialiseValidation: initialiseCardValidation,
      generateSessions
    };
  } else {
    var _config$validationCon4;
    const {
      initialiseCvcOnlyValidation
    } = useCvcOnlyValidation({
      accessCheckout,
      cvcOnlyValidationConfig: {
        cvcId: config.cvcId
      },
      merchantListener: (_config$validationCon4 = config.validationConfig) === null || _config$validationCon4 === void 0 ? void 0 : _config$validationCon4.validationListener
    });
    const generateCvcOnlySession = sessionTypes => accessCheckout.generateSessions({
      cvcId: config.cvcId
    }, sessionTypes);
    return {
      initialiseValidation: initialiseCvcOnlyValidation,
      generateSessions: generateCvcOnlySession
    };
  }
};
//# sourceMappingURL=useAccessCheckout.js.map