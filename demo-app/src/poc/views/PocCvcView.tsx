import React, { useState } from 'react';
import {
  AccessCheckout,
  CVC,
  CvcOnlyValidationConfig,
  CvcOnlyValidationEventListener,
  Sessions,
  useCvcOnlyValidation,
} from '../../../../access-checkout-react-native-sdk/src';
import Spinner from '../../common/Spinner';
import SubmitButton from '../../common/SubmitButton';
import VView from '../../common/VView';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from '../card-flow/style.js';
import { Alert, Text } from 'react-native';

import SessionLabel from '../../common/SessionLabel';
import CvcOnlyFlowE2eStates from '../cvc-flow/CvcOnlyFlow.e2e.states';
import { PocToggleBanner } from '../PocToggleBanner';
import HView from '../../common/HView';
import AccessCheckoutEditText from '../../../../access-checkout-react-native-sdk/src/ui/AccessCheckoutEditText';

export default function PocCvcOnly() {
  const [cvcIsValid, setCvcIsValid] = useState<boolean>(false);

  const [submitBtnEnabled, setSubmitBtnEnabled] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [, setIsEditable] = useState<boolean>(true);

  const [cvcSession, setCvcSession] = useState('');

  const accessCheckout = new AccessCheckout({
    baseUrl: 'https://npe.access.worldpay.com',
    merchantId: 'identity',
  });

  const cvcOnlyValidationEventListener: CvcOnlyValidationEventListener = {
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { initialiseCvcOnlyValidationPoc } = useCvcOnlyValidation(
    accessCheckout,
    new CvcOnlyValidationConfig({ cvcId: 'cvcInput' }),
    cvcOnlyValidationEventListener
  );

  const onLayout = () => {
    initialiseCvcOnlyValidationPoc()
      .then(() => {
        console.info('Cvc Only Validation successfully initialised');
      })
      .catch((error) => {
        console.info(error);
        Alert.alert('Error', `${error}`, [{ text: 'OK' }]);
      });
  };

  function generateSession() {
    setShowSpinner(true);
    setIsEditable(false);

    const cardInputConfig = {
      cvc: 'cvcInput',
    };

    accessCheckout
      .generateSessionsPOC(cardInputConfig, [CVC])
      .then((sessions: Sessions) => {
        console.info('Successfully generated session(s)');

        if (sessions.cvc) {
          setCvcSession(sessions.cvc);
        }
      })
      .catch((reason) => {
        Alert.alert('Error', `${reason}`, [{ text: 'OK' }]);
      })
      .finally(() => {
        setShowSpinner(false);
        setIsEditable(true);
        setSubmitBtnEnabled(true);
      });
  }

  let cvcSessionComponent;

  if (cvcSession) {
    cvcSessionComponent = (
      <SessionLabel
        testID="cvcSession"
        label="Cvc session:"
        session={cvcSession}
      />
    );
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    <>
      <PocToggleBanner />
      <VView style={styles.cardFlow} onLayout={onLayout}>
        <Spinner testID="spinner" show={showSpinner} />
        <HView>
          <AccessCheckoutEditText
            nativeID="cvcInput"
            testID="cvcInput"
            placeholder="CVV - From POC"
            style={[styles.cvc]}
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
          {cvcSessionComponent}
        </VView>
        <CvcOnlyFlowE2eStates
          testID="cvcOnlyFlowE2eStates"
          cvcIsValid={cvcIsValid}
          submitButtonEnabled={submitBtnEnabled}
        />
      </VView>
    </>
  );
}
