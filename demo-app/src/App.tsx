import React, { useState } from 'react';
import styles from './App-style';
import CardFlow from './card-flow/CardFlow';
import HView from './common/HView';
import VView from './common/VView';
import CvcOnly from './cvc-flow/CvcFlow';
import NavItem from './navigation/NavItem';
import { PocToggle } from './poc/PocToggle';
import PocCardFlow from './poc/card-flow/PocCardFlow';
import PocCvcOnly from './poc/views/PocCvcView';

export default function App() {
  const screens = {
    card: 'card',
    cvc: 'cvc',
  };

  //TODO: Revert default states
  const [screen, setScreen] = useState(screens.cvc);
  const [pocMode, setPocMode] = useState(false);

  let currentScreen;

  if (pocMode) {
    currentScreen = screen === screens.card ? <PocCardFlow /> : <PocCvcOnly />;
  } else {
    currentScreen = screen === screens.card ? <CardFlow /> : <CvcOnly />;
  }

  return (
    <VView style={styles.app}>
      <VView style={styles.main}>
        <PocToggle onChange={() => setPocMode(!pocMode)} />
        {currentScreen}
      </VView>
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
  );
}
