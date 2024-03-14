import React, {useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import SubmitButton from '../components/ui/SubmitButton';
import Toggle from '../components/ui/Toggle';
import Spinner from '../components/ui/Spinner';
import CardBrandImage from '../components/card/CardBrandImage';
import SessionsDisplayContainer from '../components/sessions/SessionsDisplayContainer';
import ErrorDisplayContainer from '../components/error/ErrorDisplayContainer';

import {
  AccessCheckoutTextInput,
  Brand,
  CARD,
  CardValidationEventListener,
  CVC,
  Sessions,
  useAccessCheckout,
  useCardConfig,
} from '@worldpay/access-worldpay-checkout-react-native-sdk';

const CardFlow = (): React.JSX.Element => {
  const [brand, setBrand] = useState<Brand>();
  const [panIsValid, setPanIsValid] = useState<boolean>();
  const [expiryIsValid, setExpiryIsValid] = useState<boolean>();
  const [cvcIsValid, setCvcIsValid] = useState<boolean>();

  const [submitBtnEnabled, setSubmitBtnEnabled] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const [editable, setEditable] = useState<boolean>(true);

  const [generateCardAndCvcSessions, setGenerateCardAndCvcSessions] =
    useState(false);

  const [cardSession, setCardSession] = useState<string>();
  const [cvcSession, setCvcSession] = useState<string>();

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
    baseUrl: 'https://npe.access.worldpay.com',
    checkoutId: 'identity',
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
    const sessionTypes = generateCardAndCvcSessions ? [CARD, CVC] : [CARD];

    setShowSpinner(true);
    setEditable(false);
    setSubmitBtnEnabled(false);

    generateSessions(sessionTypes)
      .then((sessions: Sessions) => {
        console.info('Successfully generated session(s)');

        setCardSession(sessions.card);
        setCvcSession(sessions.cvc);
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

  const chooseValidationColour = (
    isValid: undefined | boolean,
    isEditable: boolean,
  ) => {
    if (!isEditable) {
      return 'grey';
    }

    switch (isValid) {
      case false: {
        return 'red';
      }
      case true: {
        return 'green';
      }
      case undefined: {
        return 'grey';
      }
    }
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
              color: chooseValidationColour(panIsValid, editable),
              borderColor: chooseValidationColour(panIsValid, editable),
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
              color: chooseValidationColour(expiryIsValid, editable),
              borderColor: chooseValidationColour(expiryIsValid, editable),
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
              color: chooseValidationColour(cvcIsValid, editable),
              borderColor: chooseValidationColour(cvcIsValid, editable),
            },
          ]}
        />
      </View>
      <View style={styles.thirdLine}>
        <Text>Generate VT session + CVC session</Text>
        <Toggle
          testID="cardAndCvcSessionsToggle"
          onChange={setGenerateCardAndCvcSessions}
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
  thirdLine: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
