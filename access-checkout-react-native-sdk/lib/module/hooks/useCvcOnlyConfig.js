"use strict";

import MerchantCvcOnlyConfig from "../config/MerchantCvcOnlyConfig.js";
import { MerchantCvcOnlyValidationConfig } from "../validation/MerchantCvcOnlyValidationConfig.js";
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