export class MerchantCardValidationConfig {
    constructor({ validationListener, enablePanFormatting, acceptedCardBrands }: {
        validationListener: any;
        enablePanFormatting?: boolean | undefined;
        acceptedCardBrands?: any[] | undefined;
    });
    enablePanFormatting: boolean;
    validationListener: any;
    acceptedCardBrands: any[];
}
