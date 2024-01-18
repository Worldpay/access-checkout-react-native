import React, { useState } from 'react';
import { Text } from 'react-native';
import {
  AccessCheckout,
  Brand,
  CARD,
  CardDetails,
  CardValidationConfig,
  CardValidationEventListener,
  CVC,
  Sessions,
  useCardValidation,
} from '@worldpay/access-worldpay-checkout-react-native-sdk';
import CardBrandImage from '../common/CardBrandImage';
import CvcField from '../common/CvcField';
import ErrorView from '../common/ErrorView';
import ExpiryDateField from '../common/ExpiryDateField';
import HView from '../common/HView';
import PanField from '../common/PanField';
import SessionLabel from '../common/SessionLabel';
import Spinner from '../common/Spinner';
import SubmitButton from '../common/SubmitButton';
import Toggle from '../common/Toggle';
import VView from '../common/VView';
import CardFlowE2eStates from './CardFlow.e2e.states';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.js';

export default function CardFlow() {
  const unknownBrandLogo =
    'https://npe.access.worldpay.com/access-checkout/assets/unknown.png';

  const [panValue, setPan] = useState<string>('');
  const [expiryValue, setExpiry] = useState<string>('');
  const [cvcValue, setCvc] = useState<string>('');

  const [brand, setBrand] = useState<string>('');
  const [brandLogo, setBrandLogo] = useState<string>(unknownBrandLogo);
  const [panIsValid, setPanIsValid] = useState<boolean>(false);
  const [expiryIsValid, setExpiryIsValid] = useState<boolean>(false);
  const [cvcIsValid, setCvcIsValid] = useState<boolean>(false);

  const [submitBtnEnabled, setSubmitBtnEnabled] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const [isEditable, setIsEditable] = useState<boolean>(true);

  const [generateCardAndCvcSessions, setGenerateCardAndCvcSessions] =
    useState(false);

  const [cardSession, setCardSession] = useState('');
  const [cvcSession, setCvcSession] = useState('');

  const [error, setError] = useState<Error>();

  const accessCheckout = new AccessCheckout({
    baseUrl: 'https://npe.access.worldpay.com',
    merchantId: 'identity',
  });

  const validationConfig = new CardValidationConfig({
    panId: 'panInput',
    expiryDateId: 'expiryDateInput',
    cvcId: 'cvcInput',
    enablePanFormatting: true,
  });

  const validationEventListener: CardValidationEventListener = {
    onCardBrandChanged(brand?: Brand): void {
      if (!brand) {
        setBrand('');
        setBrandLogo(unknownBrandLogo);
        return;
      }

      setBrand(brand.name);
      for (const image of brand.images) {
        if (image.type === 'image/png') {
          setBrandLogo(image.url);
        }
      }
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

  const { initialiseCardValidation } = useCardValidation(
    accessCheckout,
    validationConfig,
    validationEventListener,
  );

  const onLayout = () => {
    initialiseCardValidation()
      .then(() => {
        console.info('Card Validation successfully initialised');
      })
      .catch((e:any) => {
        setError(e);
      });
  };

  function generateSession() {
    const sessionTypes = generateCardAndCvcSessions ? [CARD, CVC] : [CARD];

    setShowSpinner(true);
    setIsEditable(false);
    setSubmitBtnEnabled(false);

    const cardDetails: CardDetails = {
      pan: panValue,
      expiryDate: expiryValue,
      cvc: cvcValue,
    };

    accessCheckout
      .generateSessions(cardDetails, sessionTypes)
      .then((sessions: Sessions) => {
        console.info(`Successfully generated session(s)`);

        if (sessions.card) {
          setCardSession(sessions.card);
        }
        if (sessions.cvc) {
          setCvcSession(sessions.cvc);
        }
      })
      .catch((e:any) => {
        setError(e);
      })
      .finally(() => {
        setShowSpinner(false);
        setSubmitBtnEnabled(true);
        setIsEditable(true);
      });
  }

  let cardSessionComponent;
  let cvcSessionComponent;
  let errorComponent;

  if (cardSession) {
    cardSessionComponent = (
      <SessionLabel
        testID="cardSession"
        label="Card session:"
        session={cardSession}
      />
    );
  }

  if (cvcSession) {
    cvcSessionComponent = (
      <SessionLabel
        testID="cvcSession"
        label="Cvc session:"
        session={cvcSession}
      />
    );
  }

  if (error) {
    errorComponent = <ErrorView error={error} />;
  }

  return (
    <VView style={styles.cardFlow} onLayout={onLayout}>
      <Spinner testID="spinner" show={showSpinner} />
      {errorComponent}
      <HView>
        <PanField
          testID="panInput"
          isValid={panIsValid}
          onChange={setPan}
          isEditable={isEditable}
        />
        <CardBrandImage testID="cardBrandImage" logo={brandLogo} />
      </HView>
      <HView>
        <ExpiryDateField
          testID="expiryDateInput"
          isValid={expiryIsValid}
          onChange={setExpiry}
          isEditable={isEditable}
        />
        <CvcField
          testID="cvcInput"
          isValid={cvcIsValid}
          onChange={setCvc}
          isEditable={isEditable}
        />
      </HView>
      <HView>
        <HView style={{ marginTop: '2%', marginRight: '2%', marginLeft: '3%' }}>
          <Text>Generate VT session + CVC session</Text>
        </HView>
        <Toggle
          testID="cardAndCvcSessionsToggle"
          onChange={setGenerateCardAndCvcSessions}
        />
      </HView>
      <VView style={{ marginTop: '8%' }}>
        <SubmitButton
          testID="submitButton"
          onPress={generateSession}
          enabled={submitBtnEnabled}
        />
      </VView>
      <VView style={{ marginTop: '8%', marginLeft: '4%' }}>
        <Text style={{ fontWeight: 'bold' }}>Sessions</Text>
        {cardSessionComponent}
        {cvcSessionComponent}
      </VView>
      <CardFlowE2eStates
        testID="cardFlowE2eStates"
        panIsValid={panIsValid}
        expiryDateIsValid={expiryIsValid}
        cvcIsValid={cvcIsValid}
        submitButtonEnabled={submitBtnEnabled}
        cardBrand={brand}
      />
    </VView>
  );
}
