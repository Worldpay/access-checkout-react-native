import React, {useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  AccessCheckoutTextInput,
  CVC,
  CvcOnlyValidationEventListener,
  Sessions,
  useAccessCheckout,
  useCvcOnlyConfig,
} from '@worldpay/access-worldpay-checkout-react-native-sdk';
import Spinner from '../components/ui/Spinner.tsx';
import ErrorDisplayContainer from '../components/error/ErrorDisplayContainer.tsx';
import SubmitButton from '../components/ui/SubmitButton.tsx';
import SessionsDisplayContainer from '../components/sessions/SessionsDisplayContainer.tsx';
import {getValidationColour} from '../utils/Validation.ts';

const CvcOnlyFlow = (): React.JSX.Element => {
  const [cvcIsValid, setCvcIsValid] = useState<boolean>();

  const [submitBtnEnabled, setSubmitBtnEnabled] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const [isEditable, setIsEditable] = useState<boolean>(true);
  const [cvcSession, setCvcSession] = useState<string>();

  const [error, setError] = useState<Error>();

  const validationEventListener: CvcOnlyValidationEventListener = {
    onCvcValidChanged(isValid: boolean): void {
      setCvcIsValid(isValid);
      if (!isValid) {
        setSubmitBtnEnabled(false);
      }
    },

    onValidationSuccess() {
      setSubmitBtnEnabled(true);
    },
  };

  const {initialiseValidation, generateSessions} = useAccessCheckout({
    baseUrl: 'https://npe.access.worldpay.com',
    checkoutId: 'identity',
    config: useCvcOnlyConfig({
      cvcId: 'cvcInput',
      validationConfig: {
        validationListener: validationEventListener,
      },
    }),
  });

  const onLayout = () => {
    initialiseValidation()
      .then(() => {
        console.info('Card Validation successfully initialised');
      })
      .catch(e => {
        setError(e);
      });
  };

  const createSession = () => {
    setShowSpinner(true);
    setIsEditable(false);
    setSubmitBtnEnabled(false);

    generateSessions([CVC])
      .then((sessions: Sessions) => {
        console.info('Successfully generated session(s)');
        setCvcSession(sessions.cvc);
      })
      .catch(e => {
        setError(e);
      })
      .finally(() => {
        setShowSpinner(false);
        setSubmitBtnEnabled(true);
        setIsEditable(true);
      });
  };

  return (
    <View style={styles.cardFlow} onLayout={onLayout}>
      {showSpinner && <Spinner testID="spinner" show={showSpinner} />}
      {error && <ErrorDisplayContainer error={error} />}
      <View style={styles.firstLine}>
        <AccessCheckoutTextInput
          nativeID="cvcInput"
          testID="cvcInput"
          editable={isEditable}
          placeholder="CVC"
          style={[
            styles.cvc,
            {
              color: getValidationColour(cvcIsValid, isEditable),
              borderColor: getValidationColour(cvcIsValid, isEditable),
            },
          ]}
        />
      </View>
      <View style={{marginTop: '8%'}}>
        <SubmitButton
          testID="submitButton"
          onPress={createSession}
          enabled={submitBtnEnabled}
        />
      </View>
      <SessionsDisplayContainer
        testID="sessionsContainer"
        cvcSession={cvcSession}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardFlow: {
    display: 'flex',
    flexDirection: 'column',
    margin: 12,
    padding: 12,
    ...Platform.select({
      ios: {
        marginTop: 50,
      },
    }),
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  firstLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cvc: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});
export default CvcOnlyFlow;
