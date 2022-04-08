import {
    CvcValidationEventListener,
    cvcValidationNativeEventListenerOf,
} from '../../src/validation';

describe('CvcValidationEventListener', () => {
    describe('can be instantiated', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        let listener: CvcValidationEventListener;

        it('with all event handlers set up', () => {
            listener = {
                onCvcValidChanged(isValid: boolean): void {
                    console.log(isValid);
                },
                // eslint-disable-next-line  @typescript-eslint/no-empty-function
                onValidationSuccess() {},
            };
        });

        it('without an event handler for cvc validation state changes', () => {
            listener = {
                // eslint-disable-next-line  @typescript-eslint/no-empty-function
                onValidationSuccess() {},
            };
        });

        it('without an event handler for all fields valid', () => {
            // eslint-disable-next-line  @typescript-eslint/no-unused-vars
            listener = {};
        });
    });
});

describe('cvcValidationNativeEventListenerOf() returns a function which', () => {
    let cvcIsValid: boolean | undefined;
    let validationSuccess: boolean | undefined;

    const listener: CvcValidationEventListener = {
        onCvcValidChanged(isValid: boolean): void {
            cvcIsValid = isValid;
        },
        onValidationSuccess(): void {
            validationSuccess = true;
        },
    };

    const functionReturned = cvcValidationNativeEventListenerOf(listener);

    });

    describe('delegates cvc valid state change to CvcValidationEventListener onCvcValidChanged', () => {
        it('and passes true when cvc is valid', () => {
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            const event: any = {
                type: 'cvc',
                isValid: true,
            };
            functionReturned(event);

            expect(cvcIsValid).toEqual(true);
        });

        it('and passes false when cvc is not valid', () => {
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            const event: any = {
                type: 'cvc',
                isValid: false,
            };
            functionReturned(event);

            expect(cvcIsValid).toEqual(false);
        });
    });

    it('delegates validation success to CardValidationEventListener onValidationSuccess', () => {
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        const event: any = {
            type: 'all',
            isValid: true,
        };
        functionReturned(event);

        expect(validationSuccess).toEqual(true);
    });
});
