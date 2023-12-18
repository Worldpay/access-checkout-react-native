import React from 'react';
import { Text } from 'react-native';
import VView from '../common/VView';
import Toggle from '../common/Toggle';

interface PocToggleProps {
  onChange: (enabled: boolean) => void;
}

export const PocToggle = (props: PocToggleProps) => {
  return (
    <VView style={{ marginTop: 35 }}>
      <VView
        style={{
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <VView>
          <Text>Enable POCMode</Text>
        </VView>
        <VView>
          <Toggle testID="pocModeToggle" onChange={props.onChange} />
        </VView>
      </VView>
    </VView>
  );
};
