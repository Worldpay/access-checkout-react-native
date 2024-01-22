import type { CardValidationEventListener } from '../validation/CardValidationEventListener';
import MerchantCvcOnlyConfig from '../config/MerchantCvcOnlyConfig';
import { MerchantCvcOnlyValidationConfig } from '../validation/MerchantCvcOnlyValidationConfig';

export interface CvcOnlyValidationConfig {
  validationListener: CardValidationEventListener;
}
export interface UseCvcOnlyConfig {
  cvcId: string;
  validationConfig?: CvcOnlyValidationConfig;
}

export function useCvcOnlyConfig({ cvcId, validationConfig }: UseCvcOnlyConfig) {
  const cardConfig = new MerchantCvcOnlyConfig({
    cvcId,
  });

  if (validationConfig) {
    cardConfig.validationConfig = new MerchantCvcOnlyValidationConfig({
      validationListener: validationConfig.validationListener,
    });
  }

  return cardConfig;
}
