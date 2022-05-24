export interface CvcOnlyValidationEventListener {
    onCvcValidChanged?(isValid: boolean): void;
    onValidationSuccess?(): void;
}
export declare function cvcOnlyValidationNativeEventListenerOf(delegate: CvcOnlyValidationEventListener): (event: any) => void;
