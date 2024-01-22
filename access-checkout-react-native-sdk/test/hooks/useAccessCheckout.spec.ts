import {
  CardConfig,
  CardValidationEventListener,
  useAccessCheckout,
  type UseAccessCheckoutExports,
  AccessCheckout,
  type Sessions,
  type UseAccessCheckout,
  CARD,
  CVC,
  type CvcOnlyValidationEventListener,
  MerchantCardValidationConfig,
  useCvcOnlyConfig,
  useCardConfig,
} from '../../src';
import { isArray, isFunction } from '../test-utils';
import { renderHook, type RenderHookResult } from '@testing-library/react-native';
describe('useAccessCheckout', () => {
  const mockInitialiseCvcOnlyValidation = jest.fn() as () => Promise<boolean>;
  const mockInitialiseCardValidation = jest.fn() as () => Promise<boolean>;
  const mockGenerateSessions = jest.fn() as () => Promise<Sessions>;

  beforeAll(() => {
    jest
      .spyOn(AccessCheckout.prototype, 'initialiseCvcOnlyValidation')
      .mockImplementation(mockInitialiseCvcOnlyValidation);
    jest.spyOn(AccessCheckout.prototype, 'initialiseCardValidation').mockImplementation(mockInitialiseCardValidation);
    jest.spyOn(AccessCheckout.prototype, 'generateSessions').mockImplementation(mockGenerateSessions);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('using cvc only configuration', () => {
    const merchantListener: CvcOnlyValidationEventListener = {};

    it('should error when trying to use initialiseValidation when no validationConfig was provided', async () => {
      const { result }: RenderHookResult<UseAccessCheckoutExports, UseAccessCheckout> = renderHook(() =>
        useAccessCheckout({
          baseUrl: '',
          checkoutId: '',
          config: useCvcOnlyConfig({
            cvcId: 'cvcInput',
          }),
        })
      );

      const functionReturned = result.current.initialiseValidation;

      expect(() => functionReturned()).toThrowError(
        `Validation listener was undefined. When using validation methods such as 'initialiseValidation' a validation listener needs to be provided.`
      );
      expect(mockInitialiseCvcOnlyValidation).not.toHaveBeenCalled();
    });

    describe('initialiseCardValidation', () => {
      it('returns an object with a initialiseValidation property which is a function', () => {
        const { result }: RenderHookResult<UseAccessCheckoutExports, UseAccessCheckout> = renderHook(() =>
          useAccessCheckout({
            baseUrl: '',
            checkoutId: '',
            config: useCvcOnlyConfig({
              cvcId: 'cvcInput',
              validationConfig: {
                validationListener: merchantListener,
              },
            }),
          })
        );

        expect(isArray(result.current)).toEqual(false);
        expect(isFunction(result.current.initialiseValidation)).toEqual(true);
      });

      it('function returned is designed to initialise the card validation', () => {
        const { result }: RenderHookResult<UseAccessCheckoutExports, UseAccessCheckout> = renderHook(() =>
          useAccessCheckout({
            baseUrl: '',
            checkoutId: '',
            config: useCvcOnlyConfig({
              cvcId: 'cvcInput',
              validationConfig: {
                validationListener: merchantListener,
              },
            }),
          })
        );

        const functionReturned = result.current.initialiseValidation;

        expect(functionReturned).toBeDefined();
        functionReturned();

        expect(mockInitialiseCvcOnlyValidation).toHaveBeenCalledWith({
          cvcId: 'cvcInput',
        });
      });

      describe('generateSessions', () => {
        it('returns an object with a generateSessions property which is a function', () => {
          const { result }: RenderHookResult<UseAccessCheckoutExports, UseAccessCheckout> = renderHook(() =>
            useAccessCheckout({
              baseUrl: '',
              checkoutId: '',
              config: useCvcOnlyConfig({
                cvcId: 'cvcInput',
                validationConfig: {
                  validationListener: merchantListener,
                },
              }),
            })
          );

          expect(isArray(result.current)).toEqual(false);
          expect(isFunction(result.current.generateSessions)).toEqual(true);
        });

        it('function returned is designed to generate sessions', () => {
          const { result }: RenderHookResult<UseAccessCheckoutExports, UseAccessCheckout> = renderHook(() =>
            useAccessCheckout({
              baseUrl: '',
              checkoutId: '',
              config: useCvcOnlyConfig({
                cvcId: 'cvcInput',
                validationConfig: {
                  validationListener: merchantListener,
                },
              }),
            })
          );

          const functionReturned = result.current.generateSessions;

          functionReturned([CVC]);

          expect(mockGenerateSessions).toHaveBeenCalledWith(
            {
              cvcId: 'cvcInput',
            },
            ['CVC']
          );
        });
      });
    });
  });

  describe('using card configuration', () => {
    const merchantListener: CardValidationEventListener = {};

    const cardValidationConfig = new MerchantCardValidationConfig({
      validationListener: merchantListener,
    });
    const cardConfig = new CardConfig({
      panId: 'panInput',
      expiryDateId: 'expiryDateInput',
      cvcId: 'cvcInput',
      validationConfig: cardValidationConfig,
    });

    it('should error when trying to use initialiseValidation when no validationConfig was provided', async () => {
      const { result }: RenderHookResult<UseAccessCheckoutExports, UseAccessCheckout> = renderHook(() =>
        useAccessCheckout({
          baseUrl: '',
          checkoutId: '',
          config: useCardConfig({
            cvcId: 'cvcInput',
            panId: 'panId',
            expiryDateId: 'expiryDateId',
          }),
        })
      );

      const functionReturned = result.current.initialiseValidation;

      expect(() => functionReturned()).toThrowError(
        `Validation listener was undefined. When using validation methods such as 'initialiseValidation' a validation listener needs to be provided.`
      );

      expect(mockInitialiseCardValidation).not.toHaveBeenCalled();
    });

    describe('initialiseCardValidation', () => {
      it('returns an object with a initialiseValidation property which is a function', () => {
        const { result }: RenderHookResult<UseAccessCheckoutExports, UseAccessCheckout> = renderHook(() =>
          useAccessCheckout({
            baseUrl: '',
            checkoutId: '',
            config: cardConfig,
          })
        );

        expect(isArray(result.current)).toEqual(false);
        expect(isFunction(result.current.initialiseValidation)).toEqual(true);
      });

      it('function returned is designed to initialise the card validation', () => {
        const { result }: RenderHookResult<UseAccessCheckoutExports, UseAccessCheckout> = renderHook(() =>
          useAccessCheckout({
            baseUrl: '',
            checkoutId: '',
            config: cardConfig,
          })
        );

        const functionReturned = result.current.initialiseValidation;

        functionReturned();

        expect(mockInitialiseCardValidation).toHaveBeenCalledWith({
          cvcId: 'cvcInput',
          expiryDateId: 'expiryDateInput',
          panId: 'panInput',
          acceptedCardBrands: [],
          enablePanFormatting: false,
        });
      });
    });

    describe('generateSessions', () => {
      it('returns an object with a generateSessions property which is a function', () => {
        const { result }: RenderHookResult<UseAccessCheckoutExports, UseAccessCheckout> = renderHook(() =>
          useAccessCheckout({
            baseUrl: '',
            checkoutId: '',
            config: cardConfig,
          })
        );

        expect(isArray(result.current)).toEqual(false);
        expect(isFunction(result.current.generateSessions)).toEqual(true);
      });

      it('function returned is designed to generate sessions', () => {
        const { result }: RenderHookResult<UseAccessCheckoutExports, UseAccessCheckout> = renderHook(() =>
          useAccessCheckout({
            baseUrl: '',
            checkoutId: '',
            config: cardConfig,
          })
        );

        const functionReturned = result.current.generateSessions;

        functionReturned([CARD]);

        expect(mockGenerateSessions).toHaveBeenCalledWith(
          {
            cvcId: 'cvcInput',
            expiryDateId: 'expiryDateInput',
            panId: 'panInput',
          },
          ['CARD']
        );
      });
    });
  });
});
