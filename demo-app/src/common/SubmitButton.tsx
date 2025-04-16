import React from 'react';
import { Button, GestureResponderEvent } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import UIComponentProps from './UIComponentProps';

interface SubmitButtonProps extends UIComponentProps {
  onPress: (e: GestureResponderEvent) => void;
  enabled: boolean;
}

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <Button
      testID={props.testID}
      title="Submit"
      color="red"
      accessibilityLabel="Submit Card Details"
      onPress={(e: GestureResponderEvent) => props.onPress(e)}
      disabled={!props.enabled}
    />
  );
};

export default SubmitButton;
