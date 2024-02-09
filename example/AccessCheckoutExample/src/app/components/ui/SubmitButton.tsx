import React from 'react';
import {Button, GestureResponderEvent} from 'react-native';
import {UIComponentProps} from '../UIComponentProps';

interface SubmitButtonProps extends UIComponentProps {
  onPress: (e: GestureResponderEvent) => void;
  enabled: boolean;
}

const SubmitButton = (props: SubmitButtonProps): React.JSX.Element => {
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
