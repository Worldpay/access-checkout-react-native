import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import CardFlow from './screens/CardFlow';
import CvcOnlyFlow from './screens/CvcOnlyFlow';
import NavItem from './components/navigation/NavItem';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const screens = {
    card: 'card',
    cvc: 'cvc',
  };

  const [screen, setScreen] = useState(screens.card);

  const currentPage = screen === screens.card ? <CardFlow /> : <CvcOnlyFlow />;

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={[styles.main]}>
        <Text testID="app-title" style={styles.appTitle}>
          {'Example Access Checkout App'}
        </Text>
        {currentPage}
      </View>
      <View style={[styles.nav]}>
        <NavItem
          title="Card Flow"
          image={screens.card}
          selected={screen === screens.card}
          onPress={() => setScreen(screens.card)}
          style={{marginRight: 50}}
        />
        <NavItem
          title="Cvc Only Flow"
          image={screens.cvc}
          selected={screen === screens.cvc}
          onPress={() => setScreen(screens.cvc)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    margin: 12,
  },
  nav: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    width: '100%',
    bottom: 0,
    height: 100,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'black',
    padding: 20,
  },
});

export default App;
