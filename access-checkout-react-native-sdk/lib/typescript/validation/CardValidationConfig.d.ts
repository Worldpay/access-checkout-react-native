export default class CardValidationConfig {
    panId: string;
    expiryDateId: string;
    cvcId: string;
    enablePanFormatting: boolean;
    acceptedCardBrands: string[];
    constructor({ panId, expiryDateId, cvcId, enablePanFormatting, acceptedCardBrands, }: {
        panId: string;
        expiryDateId: string;
        cvcId: string;
        enablePanFormatting?: boolean;
        acceptedCardBrands?: string[];
    });
}
