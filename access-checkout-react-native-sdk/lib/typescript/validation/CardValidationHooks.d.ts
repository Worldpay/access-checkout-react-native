import AccessCheckout from '../AccessCheckout';
import CardValidationConfig from './CardValidationConfig';
import { CardValidationEventListener } from './CardValidationEventListener';
export declare function useCardValidationEventListener(merchantListener: CardValidationEventListener): void;
export declare function useCardValidation(accessCheckout: AccessCheckout, cardValidationConfig: CardValidationConfig, merchantListener: CardValidationEventListener): {
    initialiseCardValidation: () => Promise<boolean>;
};
