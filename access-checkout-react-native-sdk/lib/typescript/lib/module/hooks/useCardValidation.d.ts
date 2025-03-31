export function useCardValidationEventListener(validationListener: any): void;
export function useCardValidation({ accessCheckout, cardValidationConfig, validationListener }: {
    accessCheckout: any;
    cardValidationConfig: any;
    validationListener: any;
}): {
    initialiseCardValidation: () => any;
};
