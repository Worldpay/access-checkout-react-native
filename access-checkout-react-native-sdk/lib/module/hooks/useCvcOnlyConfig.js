import MerchantCvcOnlyConfig from '../config/MerchantCvcOnlyConfig';
import { MerchantCvcOnlyValidationConfig } from '../validation/MerchantCvcOnlyValidationConfig';
export function useCvcOnlyConfig({
  cvcId,
  validationConfig
}) {
  const cardConfig = new MerchantCvcOnlyConfig({
    cvcId
  });
  if (validationConfig) {
    cardConfig.validationConfig = new MerchantCvcOnlyValidationConfig({
      validationListener: validationConfig.validationListener
    });
  }
  return cardConfig;
}
//# sourceMappingURL=useCvcOnlyConfig.js.map