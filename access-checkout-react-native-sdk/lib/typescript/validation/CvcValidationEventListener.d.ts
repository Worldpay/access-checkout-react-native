export interface CardValidationEventListener {
    onCvcValidChanged?(isValid: boolean): void;
    onValidationSuccess?(): void;
}
export declare function cvcValidationNativeEventListenerOf(delegate: CvcValidationEventListener): (event: any) => void;
