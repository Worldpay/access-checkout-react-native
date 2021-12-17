import {
  AccessCheckout,
  CardDetails,
  SessionType,
} from 'access-checkout-react-native-sdk';
import React, { useEffect, useState } from 'react';
import { Alert, NativeEventEmitter, NativeModules, View } from 'react-native';
import CardValidationConfig
  from "../../../access-checkout-react-native-sdk/src/validation/CardValidationConfig";
import CardBrandImage from '../common/CardBrandImage';
import CvcField from '../common/CvcField';
import ExpiryDateField from '../common/ExpiryDateField';
import PanField from '../common/PanField';
import Spinner from '../common/Spinner';
import SubmitButton from '../common/SubmitButton';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.js';

export default function CardFlow() {
  const unknownBrandLogo =
    'https://preprod.access.worldpay.com/access-checkout/assets/unknown.png';

  const [panValue, setPan] = useState<string>('');
  const [expiryValue, setExpiry] = useState<string>('');
  const [cvcValue, setCvc] = useState<string>('');

  const [brandLogo, setBrandLogo] = useState<string>(unknownBrandLogo);
  const [panIsValid, setPanIsValid] = useState<boolean>(false);
  const [expiryIsValid, setExpiryIsValid] = useState<boolean>(false);
  const [cvcIsValid, setCvcIsValid] = useState<boolean>(false);

  const [submitBtnEnabled, setSubmitBtnEnabled] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const [isEditable, setIsEditable] = useState<boolean>(true);

  const accessCheckout = new AccessCheckout({
    accessBaseUrl: "https://preprod.access.worldpay.com",
    merchantId: "identity",
  });

  interface BrandImage {
    type: string;
    url: string;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleValidationResult(result: any) {
    if (result.type === 'brand') {
      if (result.value === null) {
        setBrandLogo(unknownBrandLogo);
      } else {
        const images: BrandImage[] = result.value.images;

        for (const img of images) {
          if (img.type === 'image/png') {
            setBrandLogo(img.url);
          }
        }
      }
      return;
    }

    if (result.type === 'pan') {
      setPanIsValid(result.isValid);
      if (!result.isValid) setSubmitBtnEnabled(false);
    }

    if (result.type === 'cvc') {
      setCvcIsValid(result.isValid);
      if (!result.isValid) setSubmitBtnEnabled(false);
      return;
    }

    if (result.type === 'expiry') {
      setExpiryIsValid(result.isValid);
      if (!result.isValid) setSubmitBtnEnabled(false);
      return;
    }

    if (result.type === 'all') {
      setSubmitBtnEnabled(true);
      return;
    }
  }

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(
      NativeModules.AccessCheckoutReactNative
    );

    eventEmitter.addListener(
      'AccessCheckoutValidationEvent',
      handleValidationResult
    );

    return () => {
      eventEmitter.removeListener(
        'AccessCheckoutValidationEvent',
        handleValidationResult
      );
    };
  }, []);

  function initValidation() {
    console.log('Initiating validation');

    const validationConfig = new CardValidationConfig({
      panId: "panInput",
      expiryDateId: "expiryInput",
      cvcId: "cvcInput",
      enablePanFormatting: false,
    });
    accessCheckout.initialiseValidation(validationConfig)
      .then(() => {
        console.log('Validation initialised');
      })
      .catch((reason) => {
        Alert.alert('Error', `${reason}`, [{ text: 'OK' }]);
      });
  }

  function generateSession() {
    setShowSpinner(true);
    setIsEditable(false);
    setSubmitBtnEnabled(false);

    const cardDetails:CardDetails = {
      pan: panValue,
      expiryDate: expiryValue,
      cvc: cvcValue,
    };

    accessCheckout.generateSessions(cardDetails, [SessionType.CARD, SessionType.CVC])
      .then((session) => {
        console.log(session);

        const sessions:any = {
          card: session.get("card"),
          cvc: session.get("cvc")
        };

        Alert.alert('Session', `${JSON.stringify(sessions)}`, [{ text: 'OK' }]);
      })
      .catch((reason) => {
        Alert.alert('Error', `${reason}`, [{ text: 'OK' }]);
      })
      .finally(() => {
        setShowSpinner(false);
        setSubmitBtnEnabled(true);
        setIsEditable(true);
      });
  }

  return (
    <View style={styles.container} onLayout={initValidation}>
      <Spinner show={showSpinner} />
      <View style={styles.row}>
        <PanField
          isValid={panIsValid}
          onChange={setPan}
          isEditable={isEditable}
        />
        <CardBrandImage logo={brandLogo} />
      </View>

      <View style={styles.row}>
        <ExpiryDateField
          isValid={expiryIsValid}
          onChange={setExpiry}
          isEditable={isEditable}
        />
        <CvcField
          isValid={cvcIsValid}
          onChange={setCvc}
          isEditable={isEditable}
        />
      </View>

      <View style={[styles.submitView]}>
        <SubmitButton onPress={generateSession} enabled={submitBtnEnabled} />
      </View>
    </View>
  );
}
