import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import SubmitButton from '../components/ui/SubmitButton';
import Spinner from '../components/ui/Spinner';
import CardBrandImage from '../components/card/CardBrandImage';
import SessionsDisplayContainer from '../components/sessions/SessionsDisplayContainer';
import ErrorDisplayContainer from '../components/error/ErrorDisplayContainer';

import {AccessCheckoutTextInput} from '@worldpay/access-worldpay-checkout-react-native-sdk';
import {getValidationColour} from '../utils/Validation.ts';
import {useAccessCheckoutCardAndCvcFlow} from '../hooks/useAccessCheckoutCardAndCvcFlow.ts';

const CardAndCvcFlow = (): React.JSX.Element => {
  const {
    initialiseValidation,
    generateSessions,
    cardSession,
    cvcSession,
    brand,
    panIsValid,
    expiryIsValid,
    cvcIsValid,
    canSubmit,
    error,
    isLoading,
  } = useAccessCheckoutCardAndCvcFlow({
    baseUrl: 'https://npe.access.worldpay.com',
    checkoutId: 'identity',
    config: {
      panId: 'panInput',
      expiryDateId: 'expiryDateInput',
      cvcId: 'cvcInput',
      enablePanFormatting: true,
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
          nativeID="panInput"
          testID="panInput"
          editable={editable}
          placeholder="Card Number"
          style={[
            styles.pan,
            {
              color: getValidationColour(panIsValid, editable),
              borderColor: getValidationColour(panIsValid, editable),
            },
          ]}
        />
        <CardBrandImage testID="cardBrandImage" brand={brand} />
      </View>
      <View style={styles.secondLine}>
        <AccessCheckoutTextInput
          nativeID="expiryDateInput"
          testID="expiryDateInput"
          editable={editable}
          placeholder="MM/YY"
          style={[
            styles.expiry,
            {
              color: getValidationColour(expiryIsValid, editable),
              borderColor: getValidationColour(expiryIsValid, editable),
            },
          ]}
        />
        <AccessCheckoutTextInput
          nativeID="cvcInput"
          testID="cvcInput"
          editable={editable}
          placeholder="CVC"
          style={[
            styles.cvc,
            {
              color: getValidationColour(cvcIsValid, editable),
              borderColor: getValidationColour(cvcIsValid, editable),
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
        cardSession={cardSession}
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
  pan: {
    flex: 9,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: 'white',
  },
  firstLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  secondLine: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
  expiry: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: 'white',
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

export default CardAndCvcFlow;
