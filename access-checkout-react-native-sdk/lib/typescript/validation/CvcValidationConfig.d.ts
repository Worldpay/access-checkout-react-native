import type { CardValidationEventListener } from '../index';
export declare class CvcValidationConfig {
    validationListener?: CardValidationEventListener;
    constructor({ validationListener }: CvcValidationConfig);
}
