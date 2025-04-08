"use strict";

import { MerchantCardValidationConfig } from '../validation/MerchantCardValidationConfig';
import MerchantCardConfig from '../config/MerchantCardConfig';
export const useCardConfig = props => {
  const cardConfig = new MerchantCardConfig({
    panId: props.panId,
    expiryDateId: props.expiryDateId,
    cvcId: props.cvcId
  });
  if (props.validationConfig) {
    cardConfig.validationConfig = new MerchantCardValidationConfig({
      acceptedCardBrands: props.validationConfig.acceptedCardBrands,
      enablePanFormatting: props.validationConfig.enablePanFormatting,
      validationListener: props.validationConfig.validationListener
    });
  }
  return cardConfig;
};
//# sourceMappingURL=useCardConfig.js.map