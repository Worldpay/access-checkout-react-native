import React, { useState } from 'react';
import styles from './App-style';
import CardFlow from './card-flow/CardFlow';
import HView from './common/HView';
import VView from './common/VView';
import CvcOnly from './cvc-flow/CvcFlow';
import NavItem from './navigation/NavItem';

export default function App() {
  const screens = {
    card: 'card',
    cvc: 'cvc',
  };

  const [screen, setScreen] = useState(screens.card);

  return (
    <VView style={styles.app}>
      <VView style={styles.main}>
        {screen === screens.card ? <CardFlow /> : <CvcOnly />}
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
        ></NavItem>
      </HView>
    </VView>
  );
}
