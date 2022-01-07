import AccessCheckoutReactNative, {
  AccessCheckout,
  CardDetails,
  CardValidationConfig,
} from "access-checkout-react-native-sdk";
import React, { useEffect, useState } from "react";
import { Alert, NativeEventEmitter, Text, View } from "react-native";
import SessionType from "../../../access-checkout-react-native-sdk/src/session/SessionType";
import CardBrandImage from "../common/CardBrandImage";
import CvcField from "../common/CvcField";
import ExpiryDateField from "../common/ExpiryDateField";
import PanField from "../common/PanField";
import SessionLabel from "../common/SessionLabel";
import Spinner from "../common/Spinner";
import SubmitButton from "../common/SubmitButton";
import Toggle from "../common/Toggle";
import CardFlowE2eStates from "./CardFlow.e2e.states";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from "./style.js";

export default function CardFlow() {
  const unknownBrandLogo =
    "https://preprod.access.worldpay.com/access-checkout/assets/unknown.png";

  const [panValue, setPan] = useState<string>("");
  const [expiryValue, setExpiry] = useState<string>("");
  const [cvcValue, setCvc] = useState<string>("");

  const [brand, setBrand] = useState<string>("");
  const [brandLogo, setBrandLogo] = useState<string>(unknownBrandLogo);
  const [panIsValid, setPanIsValid] = useState<boolean>(false);
  const [expiryIsValid, setExpiryIsValid] = useState<boolean>(false);
  const [cvcIsValid, setCvcIsValid] = useState<boolean>(false);

  const [submitBtnEnabled, setSubmitBtnEnabled] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const [isEditable, setIsEditable] = useState<boolean>(true);

  const [generateCardAndCvcSessions, setGenerateCardAndCvcSessions] = useState(false);

  const [cardSession, setCardSession] = useState("");
  const [cvcSession, setCvcSession] = useState("");

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
    if (result.type === "brand") {
      if (result.value === null) {
        setBrand("");
        setBrandLogo(unknownBrandLogo);
      } else {
        setBrand(result.value.name);

        const images: BrandImage[] = result.value.images;

        for (const img of images) {
          if (img.type === "image/png") {
            setBrandLogo(img.url);
          }
        }
      }
      return;
    }

    if (result.type === "pan") {
      setPanIsValid(result.isValid);
      if (!result.isValid) setSubmitBtnEnabled(false);
    }

    if (result.type === "cvc") {
      setCvcIsValid(result.isValid);
      if (!result.isValid) setSubmitBtnEnabled(false);
      return;
    }

    if (result.type === "expiry") {
      setExpiryIsValid(result.isValid);
      if (!result.isValid) setSubmitBtnEnabled(false);
      return;
    }

    if (result.type === "all") {
      setSubmitBtnEnabled(true);
      return;
    }
  }

  useEffect(() => {
    const eventSubscription = new NativeEventEmitter(
      AccessCheckoutReactNative,
    ).addListener(AccessCheckout.ValidationEventType, handleValidationResult);

    return () => {
      eventSubscription.remove();
    };
  }, []);

  function initialiseValidation() {
    console.log("Initialising validation");

    const validationConfig = new CardValidationConfig({
      panId: "panInput",
      expiryDateId: "expiryDateInput",
      cvcId: "cvcInput",
      enablePanFormatting: true,
    });
    return accessCheckout
      .initialiseValidation(validationConfig)
      .then(() => {
        console.log("Validation successfully initialised");
      })
      .catch((error) => {
        Alert.alert("Error", `${error}`, [{ text: "OK" }]);
      });
  }

  function generateSession() {
    let sessionTypes = generateCardAndCvcSessions ? [SessionType.CARD, SessionType.CVC] : [SessionType.CARD];

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
      .then((session) => {
        const sessions: any = {
          card: session.get("card"),
          cvc: session.get("cvc"),
        };

        console.log(sessions);
        if (sessions.card) {
          setCardSession(sessions.card);
        }
        if (sessions.cvc) {
          setCvcSession(sessions.cvc);
        }
      })
      .catch((reason) => {
        Alert.alert("Error", `${reason}`, [{ text: "OK" }]);
      })
      .finally(() => {
        setShowSpinner(false);
        setSubmitBtnEnabled(true);
        setIsEditable(true);
      });
  }

  let cardSessionComponent;
  let cvcSessionComponent;

  if (cardSession) {
    cardSessionComponent =
      <SessionLabel testID="cardSession" label="Card session:" session={cardSession}/>;
  }

  if (cvcSession) {
    cvcSessionComponent =
      <SessionLabel testID="cvcSession" label="Cvc session:" session={cvcSession}/>;
  }

  return (
    <View style={styles.container} onLayout={initialiseValidation}>
      <Spinner show={showSpinner}/>
      <View style={styles.row}>
        <PanField
          isValid={panIsValid}
          onChange={setPan}
          isEditable={isEditable}
        />
        <CardBrandImage logo={brandLogo}/>
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text style={{ fontWeight: "bold" }}>Sessions</Text>
        {cardSessionComponent}
        {cvcSessionComponent}
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
      <View style={styles.row}>
        <Toggle
          onChange={setGenerateCardAndCvcSessions}
          testID="cardAndCvcSessionsToggle"
        />
      </View>
      <View style={[styles.submitView]}>
        <SubmitButton onPress={generateSession} enabled={submitBtnEnabled}/>
      </View>
      <CardFlowE2eStates testID="cardFlowE2eStates"
                         panIsValid={panIsValid}
                         expiryDateIsValid={expiryIsValid}
                         cvcIsValid={cvcIsValid}
                         submitButtonEnabled={submitBtnEnabled}
                         cardBrand={brand}
      />
    </View>
  );
}
