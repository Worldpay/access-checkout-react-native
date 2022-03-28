import { AccessCheckout, CardValidationConfig } from '../index';
import { CardValidationEventListener } from './CardValidationEventListener';
export declare function useCardValidationEventListener(merchantListener: CardValidationEventListener): void;
export declare function useCardValidation(accessCheckout: AccessCheckout, cardValidationConfig: CardValidationConfig, merchantListener: CardValidationEventListener): {
    initialiseCardValidation: () => Promise<boolean>;
};
