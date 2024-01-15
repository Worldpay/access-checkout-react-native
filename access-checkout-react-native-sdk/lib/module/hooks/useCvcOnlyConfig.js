import CvcOnlyConfig from '../config/CvcOnlyConfig';
import { CvcValidationConfig } from '../validation/CvcValidationConfig';
export function useCvcOnlyConfig({
  cvcId,
  validationConfig
}) {
  const cardConfig = new CvcOnlyConfig({
    cvcId
  });
  if (validationConfig) {
    cardConfig.validationConfig = new CvcValidationConfig({
      validationListener: validationConfig.validationListener
    });
  }
  return cardConfig;
}
//# sourceMappingURL=useCvcOnlyConfig.js.map