import { Brand } from './Brand';
export interface CardValidationEventListener {
    onCardBrandChanged?(brand?: Brand): void;
    onPanValidChanged?(isValid: boolean): void;
    onExpiryDateValidChanged?(isValid: boolean): void;
    onCvcValidChanged?(isValid: boolean): void;
    onValidationSuccess?(): void;
}
export declare function cardValidationNativeEventListenerOf(delegate: CardValidationEventListener): (event: any) => void;
