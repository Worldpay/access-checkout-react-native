import React, { useEffect } from 'react';

import { View, NativeEventEmitter, NativeModules, Text } from "react-native";
import AccessCheckoutReactNative from 'access-checkout-react-native-sdk';

// @ts-ignore

export default function App() {

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(
      NativeModules.AccessCheckoutReactNative
    );

    console.log(eventEmitter);
    console.log(AccessCheckoutReactNative);

    return () => {};
  }, []);

  return (
    <View>
      <Text>Hello world</Text>
    </View>
  );
}
