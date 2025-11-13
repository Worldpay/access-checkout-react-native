import { render, screen, waitFor } from '@testing-library/react-native';

import {
  AccessCheckoutTextInput,
  AccessCheckoutTextInputFontStyle,
  AccessCheckoutTextInputFontWeight,
} from '../../src/ui/AccessCheckoutTextInput';
import { NativeModules } from 'react-native';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
describe('AccessCheckoutTextInput', () => {
  const mockRegisterViewFn = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
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
