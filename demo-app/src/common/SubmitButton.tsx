import React from 'react';
import { Button, ButtonProps } from 'react-native';
import UIComponentProps from './UIComponentProps';

interface SubmitButtonProps extends UIComponentProps {
  onPress: NonNullable<ButtonProps['onPress']>;
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
