import React from 'react';
import { Button } from 'react-native';
// @ts-ignore
import UIComponentProps from './UIComponentProps';

interface SubmitButtonProps extends UIComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPress: (e: Event) => void;
  enabled: boolean;
}

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <Button
      testID={props.testID}
      title="Submit"
      color="red"
      accessibilityLabel="Submit Card Details"
      onPress={props.onPress}
      disabled={!props.enabled}
    />
  );
};

export default SubmitButton;
