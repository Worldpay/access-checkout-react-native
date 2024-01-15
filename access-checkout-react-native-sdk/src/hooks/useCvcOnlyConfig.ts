import type { CardValidationEventListener } from '../validation/CardValidationEventListener';
import CvcOnlyConfig from '../config/CvcOnlyConfig';
import { CvcValidationConfig } from '../validation/CvcValidationConfig';

export interface UseCvcOnlyConfig {
  cvcId: string;
  validationConfig?: {
    validationListener: CardValidationEventListener;
  };
}

export function useCvcOnlyConfig({
  cvcId,
  validationConfig,
}: UseCvcOnlyConfig) {
  const cardConfig = new CvcOnlyConfig({
    cvcId,
  });

  if (validationConfig) {
    cardConfig.validationConfig = new CvcValidationConfig({
      validationListener: validationConfig.validationListener,
    });
  }

  return cardConfig;
}
