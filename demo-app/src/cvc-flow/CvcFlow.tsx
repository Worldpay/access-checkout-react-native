import React, { useState } from 'react';
import { Text } from 'react-native';
import {
  CVC,
  CvcOnlyValidationEventListener,
  Sessions,
  useAccessCheckout,
  useCvcOnlyConfig,
} from '../../../access-checkout-react-native-sdk';
import styles from '../card-flow/style.js';
import CvcField from '../common/CvcField';
import ErrorView from '../common/ErrorView';
import HView from '../common/HView';
import SessionLabel from '../common/SessionLabel';
import Spinner from '../common/Spinner';
import SubmitButton from '../common/SubmitButton';
import VView from '../common/VView';
import CvcOnlyFlowE2eStates from '../cvc-flow/CvcOnlyFlow.e2e.states';

export default function CvcFlow() {
  const [cvcIsValid, setCvcIsValid] = useState<boolean>(false);

  const [submitBtnEnabled, setSubmitBtnEnabled] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(true);

  const [cvcSession, setCvcSession] = useState('');

  const [error, setError] = useState<Error>();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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

  const { initialiseValidation, generateSessions } = useAccessCheckout({
    baseUrl: 'https://try.access.worldpay.com',
    checkoutId: 'dd0ea6d1-6a59-4fc2-89b3-f50296d7aec5',
    config: useCvcOnlyConfig({
      cvcId: 'cvcInput',
      validationConfig: {
        validationListener: cvcOnlyValidationEventListener,
      },
    }),
  });

  const onLayout = () => {
    initialiseValidation()
      .then(() => {
        console.info('Cvc Only Validation successfully initialised');
      })
      .catch((e) => {
        setError(e);
      });
  };

  function createSession() {
    setShowSpinner(true);
    setIsEditable(false);

    generateSessions([CVC])
      .then((sessions: Sessions) => {
        console.info('Successfully generated session(s)');

        if (sessions.cvc) {
          setCvcSession(sessions.cvc);
        }
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setShowSpinner(false);
        setIsEditable(true);
        setSubmitBtnEnabled(true);
      });
  }

  let cvcSessionComponent;
  let errorComponent;

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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    <VView style={styles.cardFlow} onLayout={onLayout}>
      <Spinner testID="spinner" show={showSpinner} />
      {errorComponent}
      <HView>
        <CvcField
          testID="cvcInput"
          isEditable={isEditable}
          isValid={cvcIsValid}
        />
      </HView>
      <VView style={{ marginTop: '8%' }}>
        <SubmitButton
          testID="submitButton"
          onPress={createSession}
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
  );
}
