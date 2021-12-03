import AccessCheckoutReactNative from "access-checkout-react-native-sdk";
import React, { useEffect, useState } from "react";
import { Alert, NativeEventEmitter, NativeModules, View } from "react-native";
import CardBrandImage from "../common/CardBrandImage";
import CvcField from "../common/CvcField";
import ExpiryDateField from "../common/ExpiryDateField";
import PanField from "../common/PanField";
import Spinner from "../common/Spinner";
import SubmitButton from "../common/SubmitButton";
// @ts-ignore
import styles from "./style.js";

export default function CardFlow() {
  const unknownBrandLogo =
    "https://preprod.access.worldpay.com/access-checkout/assets/unknown.png";

  const [panValue, setPan] = useState<string>("");
  const [expiryValue, setExpiry] = useState<string>("");
  const [cvcValue, setCvc] = useState<string>("");

  const [brandLogo, setBrandLogo] = useState<string>(unknownBrandLogo);
  const [panIsValid, setPanIsValid] = useState<boolean>(false);
  const [expiryIsValid, setExpiryIsValid] = useState<boolean>(false);
  const [cvcIsValid, setCvcIsValid] = useState<boolean>(false);

  const [submitBtnEnabled, setSubmitBtnEnabled] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const [isEditable, setIsEditable] = useState<boolean>(true);

  interface BrandImage {
    type: string;
    url: string;
  }

  function handleValidationResult(result: any) {
    if (result.type === "brand") {
      if (result.value === null) {
        setBrandLogo(unknownBrandLogo);
      } else {
        let images: BrandImage[] = result.value.images;

        for (let img of images) {
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
    const eventEmitter = new NativeEventEmitter(
      NativeModules.AccessCheckoutReactNative,
    );

    eventEmitter.addListener(
      "AccessCheckoutValidationEvent",
      handleValidationResult,
    );

    return () => {
      eventEmitter.removeListener(
        "AccessCheckoutValidationEvent",
        handleValidationResult,
      );
    };
  }, []);

  function initValidation() {
    console.log("Initiating validation");
    AccessCheckoutReactNative.initialiseValidation({
      baseUrl: "https://preprod.access.worldpay.com",
      panId: "panInput",
      expiryId: "expiryInput",
      cvcId: "cvcInput",
      enablePanFormatting: true,
      acceptedCardBrands: [],
    })
      .then(() => {
        console.log("Validation initialised");
      })
      .catch((reason) => {
        Alert.alert("Error", `${reason}`, [{ text: "OK" }]);
      });
  }

  function generateSession() {
    setShowSpinner(true);
    setIsEditable(false);
    setSubmitBtnEnabled(false);
    AccessCheckoutReactNative.generateSessions({
      baseUrl: "https://preprod.access.worldpay.com",
      merchantId: "identity",
      panValue: panValue,
      expiryValue: expiryValue,
      cvcValue: cvcValue,
      sessionTypes: ["CARD", "CVC"],
    })
      .then((session) => {
        console.log(session);
        Alert.alert("Session", `${JSON.stringify(session)}`, [{ text: "OK" }]);
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

  return (
    <View style={styles.container} onLayout={initValidation}>
      <Spinner show={showSpinner}/>
      <View style={styles.row}>
        <PanField
          isValid={panIsValid}
          onChange={setPan}
          isEditable={isEditable}
        />
        <CardBrandImage logo={brandLogo}/>
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
        <SubmitButton onPress={generateSession} enabled={submitBtnEnabled}/>
      </View>
    </View>
  );
}
