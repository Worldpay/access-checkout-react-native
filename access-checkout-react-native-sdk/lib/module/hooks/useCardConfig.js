import { CardValidationConfig } from '../validation/CardValidationConfig';
import CardConfig from '../config/CardConfig';
export const useCardConfig = props => {
  const cardConfig = new CardConfig({
    panId: props.panId,
    expiryDateId: props.expiryDateId,
    cvcId: props.cvcId
  });
  if (props.validationConfig) {
    cardConfig.validationConfig = new CardValidationConfig({
      acceptedCardBrands: props.validationConfig.acceptedCardBrands,
      enablePanFormatting: props.validationConfig.enablePanFormatting,
      validationListener: props.validationConfig.validationListener
    });
  }
  return cardConfig;
};
//# sourceMappingURL=useCardConfig.js.map