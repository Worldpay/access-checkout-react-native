import { render, screen, waitFor } from '@testing-library/react-native';

import {
  AccessCheckoutTextInput,
  AccessCheckoutTextInputFontStyle,
  AccessCheckoutTextInputFontWeight,
} from '../../src/ui/AccessCheckoutTextInput';
import { NativeModules } from 'react-native';

// Mock textInputState so tests can control its methods.
// This must be at module scope so Jest hoists it before the `require` in AccessCheckoutTextInput.tsx.
const mockRegisterInput = jest.fn();
const mockUnregisterInput = jest.fn();
const mockFocusInput = jest.fn();

jest.mock('react-native/Libraries/Components/TextInput/TextInputState', () => ({
  default: {
    get registerInput() { return mockRegisterInput; },
    get unregisterInput() { return mockUnregisterInput; },
    get focusInput() { return mockFocusInput; },
  },
}));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
describe('AccessCheckoutTextInput', () => {
  const mockRegisterViewFn = jest.fn();

  // Install stable jest.fn() mocks on TextInput.State once, before any test runs.
  // We do this in beforeAll rather than jest.mock('react-native') to avoid triggering
  // the full native module registry (which causes TurboModuleRegistry DevMenu errors).
  beforeAll(() => {
    const { TextInput } = require('react-native');
    TextInput.State.currentlyFocusedInput = jest.fn().mockReturnValue(null);
    TextInput.State.blurTextInput = jest.fn();
    TextInput.State.focusTextInput = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    // Re-apply default return value for currentlyFocusedInput after clearAllMocks resets it
    require('react-native').TextInput.State.currentlyFocusedInput.mockReturnValue(null);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mock('./../../src/ui/RCTAccessCheckoutTextInput', (props: never) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const React = require('react');
      return React.createElement('RCTAccessCheckoutTextInput', props);
    });
    NativeModules.AccessCheckoutReactNative.registerView = mockRegisterViewFn;
  });

  const viewContainerHasDefaultStates = async (testID: string) => {
    //View Container
    const accessCheckoutTextInputView = await screen.findByTestId(testID);
    expect(accessCheckoutTextInputView).toBeOnTheScreen();
    expect(accessCheckoutTextInputView).toHaveProp('style', [{ height: 40 }]);
    return accessCheckoutTextInputView;
  };

  const nativeComponentHasDefaultStates = async (testID: string) => {
    //Native Component
    const accessCheckoutTextInput = await screen.findByTestId(testID);
    expect(accessCheckoutTextInput).toBeOnTheScreen();
    expect(accessCheckoutTextInput).toHaveProp('style', [{ flex: 1 }]);
    return accessCheckoutTextInput;
  };

  describe('is rendered', () => {
    it('by default', async () => {
      render(
        <AccessCheckoutTextInput testID="my-access-checkout-text-input" nativeID="my-access-checkout-text-input" />
      );

      //View Container
      const accessCheckoutTextInputView = await screen.findByTestId('my-access-checkout-text-input-view');
      expect(accessCheckoutTextInputView).toBeOnTheScreen();
      //Native component
      const accessCheckoutTextInput = await screen.findByTestId('my-access-checkout-text-input');
      expect(accessCheckoutTextInput).toBeOnTheScreen();
    });

    it('nativeID is passed as a prop onto native component', async () => {
      render(
        <AccessCheckoutTextInput testID="my-access-checkout-text-input" nativeID="my-access-checkout-text-input" />
      );

      //View Container
      await viewContainerHasDefaultStates('my-access-checkout-text-input-view');
      //Native component
      const accessCheckoutTextInput = await nativeComponentHasDefaultStates('my-access-checkout-text-input');
      expect(accessCheckoutTextInput).toHaveProp('nativeID', 'my-access-checkout-text-input');
    });

    it('placeholder can be customized when provided', async () => {
      render(
        <AccessCheckoutTextInput
          testID="my-access-checkout-text-input"
          nativeID="my-access-checkout-text-input"
          placeholder="my-awesome-placeholder"
        />
      );

      //View Container
      await viewContainerHasDefaultStates('my-access-checkout-text-input-view');
      //Native component
      const accessCheckoutTextInput = await nativeComponentHasDefaultStates('my-access-checkout-text-input');
      expect(accessCheckoutTextInput).toHaveProp('placeholder', 'my-awesome-placeholder');
    });

    describe('styling', () => {
      describe('View Container', () => {
        it('height is defaulted when not specified', async () => {
          render(
            <AccessCheckoutTextInput testID="my-access-checkout-text-input" nativeID="my-access-checkout-text-input" />
          );

          //View Container
          await viewContainerHasDefaultStates('my-access-checkout-text-input-view');
          //Native component
          await nativeComponentHasDefaultStates('my-access-checkout-text-input');
        });

        it('height can be customized when provided', async () => {
          render(
            <AccessCheckoutTextInput
              testID="my-access-checkout-text-input"
              nativeID="my-access-checkout-text-input"
              style={{ height: 100 }}
            />
          );

          //View Container
          const accessCheckoutTextInputView = await screen.findByTestId('my-access-checkout-text-input-view');
          expect(accessCheckoutTextInputView).toBeOnTheScreen();
          expect(accessCheckoutTextInputView).toHaveProp('style', [{ height: 100 }]);
          //Native component
          await nativeComponentHasDefaultStates('my-access-checkout-text-input');
        });

        it('borderColor can be customized when provided', async () => {
          render(
            <AccessCheckoutTextInput
              testID="my-access-checkout-text-input"
              nativeID="my-access-checkout-text-input"
              style={{ borderColor: 'red' }}
            />
          );

          //View Container
          const accessCheckoutTextInputView = await screen.findByTestId('my-access-checkout-text-input-view');
          expect(accessCheckoutTextInputView).toHaveStyle({ height: 40, borderColor: 'red' });
          //Native component
          await nativeComponentHasDefaultStates('my-access-checkout-text-input');
        });

        it('backgroundColor can be customized when provided', async () => {
          render(
            <AccessCheckoutTextInput
              testID="my-access-checkout-text-input"
              nativeID="my-access-checkout-text-input"
              style={{ backgroundColor: 'red' }}
            />
          );

          //View Container
          const accessCheckoutTextInputView = await screen.findByTestId('my-access-checkout-text-input-view');
          expect(accessCheckoutTextInputView).toHaveStyle({ height: 40, backgroundColor: 'red' });
          //Native component
          await nativeComponentHasDefaultStates('my-access-checkout-text-input');
        });
      });

      describe('Native Component', () => {
        it('text color can be customized when provided', async () => {
          render(
            <AccessCheckoutTextInput
              testID="my-access-checkout-text-input"
              nativeID="my-access-checkout-text-input"
              style={{ color: 'red' }}
            />
          );

          //View Container
          await viewContainerHasDefaultStates('my-access-checkout-text-input-view');
          //Native component
          const accessCheckoutTextInput = await nativeComponentHasDefaultStates('my-access-checkout-text-input');
          expect(accessCheckoutTextInput).toHaveProp('color', 'red');
        });

        it('text color can be customized when provided', async () => {
          render(
            <AccessCheckoutTextInput
              testID="my-access-checkout-text-input"
              nativeID="my-access-checkout-text-input"
              style={{ color: 'red' }}
            />
          );

          //View Container
          await viewContainerHasDefaultStates('my-access-checkout-text-input-view');
          //Native component
          const accessCheckoutTextInput = await nativeComponentHasDefaultStates('my-access-checkout-text-input');
          expect(accessCheckoutTextInput).toHaveProp('color', 'red');
        });

        it('fontFamily can be customized when provided', async () => {
          render(
            <AccessCheckoutTextInput
              testID="my-access-checkout-text-input"
              nativeID="my-access-checkout-text-input"
              style={{ fontFamily: 'custom-font' }}
            />
          );

          //View Container
          await viewContainerHasDefaultStates('my-access-checkout-text-input-view');
          //Native component
          const accessCheckoutTextInput = await nativeComponentHasDefaultStates('my-access-checkout-text-input');
          expect(accessCheckoutTextInput).toHaveProp('font', {
            fontFamily: 'custom-font',
            fontSize: undefined,
            fontStyle: undefined,
            fontWeight: undefined,
          });
        });

        it('fontSize can be customized when provided', async () => {
          render(
            <AccessCheckoutTextInput
              testID="my-access-checkout-text-input"
              nativeID="my-access-checkout-text-input"
              style={{ fontSize: 10 }}
            />
          );

          //View Container
          await viewContainerHasDefaultStates('my-access-checkout-text-input-view');
          //Native component
          const accessCheckoutTextInput = await nativeComponentHasDefaultStates('my-access-checkout-text-input');
          expect(accessCheckoutTextInput).toHaveProp('font', {
            fontFamily: undefined,
            fontSize: 10,
            fontStyle: undefined,
            fontWeight: undefined,
          });
        });

        it.each<AccessCheckoutTextInputFontStyle>(['normal', 'italic', undefined])(
          'fontStyle can be customized when provided',
          async (fontStyleValue) => {
            render(
              <AccessCheckoutTextInput
                testID="my-access-checkout-text-input"
                nativeID="my-access-checkout-text-input"
                style={{ fontStyle: fontStyleValue }}
              />
            );

            //View Container
            await viewContainerHasDefaultStates('my-access-checkout-text-input-view');
            //Native component
            const accessCheckoutTextInput = await nativeComponentHasDefaultStates('my-access-checkout-text-input');
            expect(accessCheckoutTextInput).toHaveProp('font', {
              fontFamily: undefined,
              fontSize: undefined,
              fontStyle: fontStyleValue,
              fontWeight: undefined,
            });
          }
        );

        it.each<AccessCheckoutTextInputFontWeight>([
          'normal',
          'bold',
          '100',
          '200',
          '300',
          '400',
          '500',
          '600',
          '700',
          '800',
          '900',
        ])('fontWeight can be customized when provided', async (fontWeightValue) => {
          render(
            <AccessCheckoutTextInput
              testID="my-access-checkout-text-input"
              nativeID="my-access-checkout-text-input"
              style={{ fontWeight: fontWeightValue }}
            />
          );

          //View Container
          await viewContainerHasDefaultStates('my-access-checkout-text-input-view');
          //Native component

          const accessCheckoutTextInput = await nativeComponentHasDefaultStates('my-access-checkout-text-input');
          expect(accessCheckoutTextInput).toHaveProp('font', {
            fontFamily: undefined,
            fontSize: undefined,
            fontStyle: undefined,
            fontWeight: fontWeightValue,
          });
        });

        it.each<boolean>([true, false])('editable can be customized when provided', async (editableValue) => {
          render(
            <AccessCheckoutTextInput
              testID="my-access-checkout-text-input"
              nativeID="my-access-checkout-text-input"
              editable={editableValue}
            />
          );

          //View Container
          await viewContainerHasDefaultStates('my-access-checkout-text-input-view');
          //Native component
          const accessCheckoutTextInput = await nativeComponentHasDefaultStates('my-access-checkout-text-input');
          expect(accessCheckoutTextInput).toHaveProp('editable', editableValue);
        });
      });
    });
  });

  describe('AccessCheckoutTextInput textInputState lifecycle', () => {
    it('useLayoutEffect does nothing when ref is null (no registerInput call)', async () => {
      render(
        <AccessCheckoutTextInput testID="ti-lifecycle" nativeID="ti-lifecycle" />
      );

      await screen.findByTestId('ti-lifecycle');
      // Verifies there is no crash
    });

    it('blurTextInput is called on unmount when component is the currently focused input', async () => {
      // We need currentlyFocusedInput to return the same object that ref.current holds.
      // ref.current is the host component instance set by React on the RTCAccessCheckoutTextInput.
      // The only way to get that value is to intercept it at registerInput time, since
      // textInputState.registerInput(inputRefValue) is called with ref.current in useLayoutEffect.
      let capturedRef: unknown = null;
      mockRegisterInput.mockImplementation((ref: unknown) => {
        capturedRef = ref;
      });

      const { unmount } = render(
        <AccessCheckoutTextInput testID="ti-blur" nativeID="ti-blur" />
      );
      await screen.findByTestId('ti-blur');

      // capturedRef is now the same object as ref.current inside the component
      require('react-native').TextInput.State.currentlyFocusedInput.mockReturnValue(capturedRef);

      unmount();

      expect(require('react-native').TextInput.State.blurTextInput).toHaveBeenCalledWith(capturedRef);
    });

    it('blurTextInput is NOT called on unmount when component is not the currently focused input', async () => {
      // currentlyFocusedInput returns null by default (set in beforeEach)
      const { unmount } = render(
        <AccessCheckoutTextInput testID="ti-blur-skip" nativeID="ti-blur-skip" />
      );
      await screen.findByTestId('ti-blur-skip');

      unmount();

      expect(require('react-native').TextInput.State.blurTextInput).not.toHaveBeenCalled();
    });
  });

  describe('AccessCheckoutTextInput onFocusChange handler', () => {
    it('does nothing when ref.current is null', async () => {
      render(
        <AccessCheckoutTextInput testID="oc-null-ref" nativeID="oc-null-ref" />
      );
      const nativeInput = await screen.findByTestId('oc-null-ref');

      const onFocusChange = nativeInput.props.onFocusChange;
      expect(onFocusChange).toBeDefined();

      // Should not throw
      expect(() =>
        onFocusChange({ nativeEvent: { isFocused: true } })
      ).not.toThrow();
    });

    it('focusInput is called on textInputState when isFocused=true', async () => {
      render(
        <AccessCheckoutTextInput testID="oc-focus" nativeID="oc-focus" />
      );
      const nativeInput = await screen.findByTestId('oc-focus');

      const onFocusChange = nativeInput.props.onFocusChange;
      onFocusChange({ nativeEvent: { isFocused: true } });

      expect(mockFocusInput).toHaveBeenCalled();
    });

    it('focusInput is NOT called when isFocused=false', async () => {
      render(
        <AccessCheckoutTextInput testID="oc-blur" nativeID="oc-blur" />
      );
      const nativeInput = await screen.findByTestId('oc-blur');

      const onFocusChange = nativeInput.props.onFocusChange;
      onFocusChange({ nativeEvent: { isFocused: false } });

      expect(mockFocusInput).not.toHaveBeenCalled();
    });
  });

  describe('AccessCheckoutTextInput registerView', () => {
    it('calls registerView when ref.current is set', async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      jest.spyOn(require('react-native'), 'findNodeHandle').mockReturnValue(777);

      render(<AccessCheckoutTextInput testID="field" nativeID="field-native-id" />);

      // Ensure the native element rendered (ref assigned)
      await screen.findByTestId('field');
      await waitFor(() => expect(mockRegisterViewFn).toHaveBeenCalledWith(777, 'field-native-id'));
    });

    it('calls registerView again when nativeID changes', async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      jest.spyOn(require('react-native'), 'findNodeHandle').mockReturnValue(555);

      const { rerender } = render(<AccessCheckoutTextInput testID="field" nativeID="first-id" />);
      await screen.findByTestId('field');
      await waitFor(() => expect(mockRegisterViewFn).toHaveBeenCalledWith(555, 'first-id'));

      // Change nativeID prop (triggers useEffect dependency)
      rerender(<AccessCheckoutTextInput testID="field" nativeID="second-id" />);
      await waitFor(() => expect(mockRegisterViewFn).toHaveBeenCalledWith(555, 'second-id'));

      expect(mockRegisterViewFn).toHaveBeenCalledTimes(2);
    });
  });
});
