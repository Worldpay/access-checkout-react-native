import React from 'react';
import { Switch } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import UIComponentProps from './UIComponentProps';

interface ToggleProps extends UIComponentProps {
  value: boolean;
  onChange(enabled: boolean): void;
}

const Toggle = (props: ToggleProps) => {
  return (
    <Switch
      testID={props.testID}
      trackColor={{ false: '#767577', true: '#519259' }}
      thumbColor={props.value ? '#95D1CC' : '#292C6D'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={props.onChange}
      value={props.value}
    />
  );
};

export default Toggle;
