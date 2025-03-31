export function useCvcOnlyValidationEventListener(validationListener: any): void;
export function useCvcOnlyValidation({ accessCheckout, cvcOnlyValidationConfig, validationListener }: {
    accessCheckout: any;
    cvcOnlyValidationConfig: any;
    validationListener: any;
}): {
    initialiseCvcOnlyValidation: () => any;
};
