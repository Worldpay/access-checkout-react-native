import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CardFlow from './flows/CardFlow';
import CvcFlow from './flows/CvcFlow';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Card Flow" component={CardFlow} />
      <Tab.Screen name="Cvc Flow2" component={CvcFlow} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <React.Fragment>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </React.Fragment>
  );
}
