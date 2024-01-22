import type { CardValidationEventListener } from '../validation/CardValidationEventListener';
import { MerchantCardValidationConfig } from '../validation/MerchantCardValidationConfig';
import MerchantCardConfig from '../config/MerchantCardConfig';

export interface CardValidationConfig {
  acceptedCardBrands?: string[];
  enablePanFormatting?: boolean;
  validationListener: CardValidationEventListener;
}
export interface UseCardConfig {
  panId: string;
  expiryDateId: string;
  cvcId: string;
  validationConfig?: MerchantCardValidationConfig;
}

export const useCardConfig = (props: UseCardConfig): MerchantCardConfig => {
  const cardConfig = new MerchantCardConfig({
    panId: props.panId,
    expiryDateId: props.expiryDateId,
    cvcId: props.cvcId,
  });

  if (props.validationConfig) {
    cardConfig.validationConfig = new MerchantCardValidationConfig({
      acceptedCardBrands: props.validationConfig.acceptedCardBrands,
      enablePanFormatting: props.validationConfig.enablePanFormatting,
      validationListener: props.validationConfig.validationListener,
    });
  }

  return cardConfig;
};
