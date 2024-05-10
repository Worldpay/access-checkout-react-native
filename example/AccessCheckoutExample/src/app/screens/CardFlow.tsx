import React, {useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';

import SubmitButton from '../components/ui/SubmitButton';
import Spinner from '../components/ui/Spinner';
import CardBrandImage from '../components/card/CardBrandImage';
import SessionsDisplayContainer from '../components/sessions/SessionsDisplayContainer';
import ErrorDisplayContainer from '../components/error/ErrorDisplayContainer';

import {
  AccessCheckoutTextInput,
  Brand,
  CARD,
  CardValidationEventListener,
  Sessions,
  useAccessCheckout,
  useCardConfig,
} from '@worldpay/access-worldpay-checkout-react-native-sdk';
import {getValidationColour} from '../utils/Validation.ts';

const CardFlow = (): React.JSX.Element => {
  const [brand, setBrand] = useState<Brand>();
  const [panIsValid, setPanIsValid] = useState<boolean>();
  const [expiryIsValid, setExpiryIsValid] = useState<boolean>();
  const [cvcIsValid, setCvcIsValid] = useState<boolean>();

  const [submitBtnEnabled, setSubmitBtnEnabled] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const [editable, setEditable] = useState<boolean>(true);

  const [cardSession, setCardSession] = useState<string>();

  const [error, setError] = useState<Error>();

  const validationEventListener: CardValidationEventListener = {
    onCardBrandChanged(brand?: Brand): void {
      brand ? setBrand(brand) : setBrand(undefined);
    },

    onPanValidChanged(isValid: boolean): void {
      setPanIsValid(isValid);
      if (!isValid) {
        setSubmitBtnEnabled(false);
      }
    },

    onExpiryDateValidChanged(isValid: boolean): void {
      setExpiryIsValid(isValid);
      if (!isValid) {
        setSubmitBtnEnabled(false);
      }
    },

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
    baseUrl: 'https://try.access.worldpay.com',
    checkoutId: 'dd0ea6d1-6a59-4fc2-89b3-f50296d7aec5',
    config: useCardConfig({
      panId: 'panInput',
      expiryDateId: 'expiryDateInput',
      cvcId: 'cvcInput',
      validationConfig: {
        enablePanFormatting: true,
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
    setEditable(false);
    setSubmitBtnEnabled(false);

    const sessionTypes = [CARD];

    generateSessions(sessionTypes)
      .then((sessions: Sessions) => {
        console.info('Successfully generated session(s)');

        setCardSession(sessions.card);
      })
      .catch(e => {
        setError(e);
      })
      .finally(() => {
        setShowSpinner(false);
        setSubmitBtnEnabled(true);
        setEditable(true);
      });
  };

  return (
    <View style={styles.cardFlow} onLayout={onLayout}>
      {showSpinner && <Spinner testID="spinner" show={showSpinner} />}
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
          enabled={submitBtnEnabled}
        />
      </View>
      <SessionsDisplayContainer
        testID="sessionsContainer"
        cardSession={cardSession}
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
  secondLine: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
  pan: {
    flex: 9,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: 'white',
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

export default CardFlow;
