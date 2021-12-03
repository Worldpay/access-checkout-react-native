import React from 'react';
import { Button } from 'react-native';

interface SubmitButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPress: any;
  enabled: boolean;
}

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <Button
      title="Submit"
      color="red"
      accessibilityLabel="Submit Card Details"
      onPress={props.onPress}
      disabled={!props.enabled}
    />
  );
};

export default SubmitButton;
