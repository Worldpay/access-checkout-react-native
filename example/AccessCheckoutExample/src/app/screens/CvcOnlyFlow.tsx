import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {AccessCheckoutTextInput} from '@worldpay/access-worldpay-checkout-react-native-sdk';
import Spinner from '../components/ui/Spinner.tsx';
import ErrorDisplayContainer from '../components/error/ErrorDisplayContainer.tsx';
import SubmitButton from '../components/ui/SubmitButton.tsx';
import SessionsDisplayContainer from '../components/sessions/SessionsDisplayContainer.tsx';
import {getValidationColour} from '../utils/Validation.ts';
import {useAccessCheckoutCvcOnlyFlow} from '../hooks/useAccessCheckoutCvcFlow.ts';

const CvcOnlyFlow = (): React.JSX.Element => {
  const {
    initialiseValidation,
    generateSessions,
    cvcSession,
    cvcIsValid,
    canSubmit,
    error,
    isLoading,
  } = useAccessCheckoutCvcOnlyFlow({
    baseUrl: 'https://npe.access.worldpay.com',
    checkoutId: 'identity',
    config: {
      cvcId: 'cvcInput',
    },
  });

  const [editable, setEditable] = useState<boolean>(true);

  const createSession = () => {
    setEditable(false);
    generateSessions();
    setEditable(true);
  };

  return (
    <View style={styles.cardFlow} onLayout={initialiseValidation}>
      {isLoading && <Spinner testID="spinner" show={isLoading} />}
      {error && <ErrorDisplayContainer error={error} />}
      <View style={styles.firstLine}>
        <AccessCheckoutTextInput
          nativeID="cvcInput"
          testID="cvcInput"
          editable={editable}
          placeholder="CVC"
          style={[
            styles.cvc,
            {
              color: getValidationColour(cvcIsValid, canSubmit),
              borderColor: getValidationColour(cvcIsValid, canSubmit),
            },
          ]}
        />
      </View>
      <View style={{marginTop: '8%'}}>
        <SubmitButton
          testID="submitButton"
          onPress={createSession}
          enabled={canSubmit}
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
