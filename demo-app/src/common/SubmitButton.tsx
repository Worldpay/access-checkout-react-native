import React from 'react';
import { Button } from 'react-native';

interface SubmitButtonProps {
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
