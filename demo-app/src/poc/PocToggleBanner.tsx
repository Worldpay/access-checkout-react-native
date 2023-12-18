import React from 'react';
import { Text } from 'react-native';
import VView from '../common/VView';

export const PocToggleBanner = () => {
  return (
    <VView
      style={{
        margin: 20,
        padding: 5,
        borderColor: 'red',
        borderStyle: 'solid',
        borderWidth: 1,
      }}>
      <Text style={{ color: 'red' }}>Using POC Mode</Text>
    </VView>
  );
};
