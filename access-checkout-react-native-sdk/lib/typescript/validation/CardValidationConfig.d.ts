import type { CardValidationEventListener } from '../index';
export declare class CardValidationConfig {
    enablePanFormatting?: boolean;
    acceptedCardBrands?: string[];
    validationListener?: CardValidationEventListener;
    constructor({ validationListener, enablePanFormatting, acceptedCardBrands, }: CardValidationConfig);
}
