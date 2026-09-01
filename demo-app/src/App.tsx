import React, { useState } from 'react';
import styles from './App-style';
import CardFlow from './card-flow/CardFlow';
import HView from './common/HView';
import VView from './common/VView';
import CvcOnly from './cvc-flow/CvcFlow';
import NavItem from './navigation/NavItem';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
export default function App() {
  const screens = {
    card: 'card',
    cvc: 'cvc',
  } as const;

  const [screen, setScreen] = useState<(typeof screens)[keyof typeof screens]>(
    screens.card
  );

  const currentScreen = screen === screens.card ? <CardFlow /> : <CvcOnly />;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.app} edges={['bottom']}>
        <VView style={styles.app} testID="root">
          <VView style={styles.main}>{currentScreen}</VView>
          <HView style={styles.nav}>
            <NavItem
              title="Card Flow"
              image={screens.card}
              selected={screen === screens.card}
              onPress={() => setScreen(screens.card)}
              style={{ marginRight: 50 }}
            />
            <NavItem
              title="Cvc Only Flow"
              image={screens.cvc}
              selected={screen === screens.cvc}
              onPress={() => setScreen(screens.cvc)}
            />
          </HView>
        </VView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
