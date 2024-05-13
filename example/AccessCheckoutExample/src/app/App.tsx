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
import CardAndCvcFlow from './screens/CardAndCvcFlow.tsx';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const screens: Record<string, {id: string; title: string}> = {
    card: {
      id: 'card',
      title: 'Card Only Flow',
    },
    cardAndCvc: {
      id: 'cardAndCvc',
      title: 'Card and Cvc Flow',
    },
    cvc: {
      id: 'cvc',
      title: 'Cvc Only Flow',
    },
  };

  const [screen, setScreen] = useState(screens.card.id);

  const currentPage =
    screen === screens.card.id ? (
      <CardFlow />
    ) : screen === screens.cvc.id ? (
      <CvcOnlyFlow />
    ) : (
      <CardAndCvcFlow />
    );

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={[styles.main]}>
        <Text testID="app-title" style={styles.appTitle}>
          {'Example Access Checkout App'}
        </Text>
        <Text testID="screen-title" style={styles.appTitle}>
          {screens[screen].title}
        </Text>
        {currentPage}
      </View>
      <View style={[styles.nav]}>
        {Object.keys(screens).map((key: any) => {
          const scr = screens[key];
          return (
            <NavItem
              key={key}
              title={scr.title}
              image={scr.id}
              selected={screen === scr.id}
              onPress={() => setScreen(scr.id)}
              style={{flex: 1, justifyContent: 'space-between'}}
            />
          );
        })}
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
