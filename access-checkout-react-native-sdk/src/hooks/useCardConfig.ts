import type { CardValidationEventListener } from '../validation/CardValidationEventListener';
import { CardValidationConfig } from '../validation/CardValidationConfig';
import CardConfig from '../config/CardConfig';

export interface UseCardConfig {
  panId: string;
  expiryDateId: string;
  cvcId: string;
  validationConfig?: {
    acceptedCardBrands?: string[];
    enablePanFormatting?: boolean;
    validationListener: CardValidationEventListener;
  };
}

export const useCardConfig = (props: UseCardConfig): CardConfig => {
  const cardConfig = new CardConfig({
    panId: props.panId,
    expiryDateId: props.expiryDateId,
    cvcId: props.cvcId,
  });

  if (props.validationConfig) {
    cardConfig.validationConfig = new CardValidationConfig({
      acceptedCardBrands: props.validationConfig.acceptedCardBrands,
      enablePanFormatting: props.validationConfig.enablePanFormatting,
      validationListener: props.validationConfig.validationListener,
    });
  }

  return cardConfig;
};
