import React, {useState} from 'react';
import {Switch} from 'react-native';

import {UIComponentProps} from '../UIComponentProps';

interface ToggleProps extends UIComponentProps {
  onChange(enabled: boolean): void;
}

const Toggle = (props: ToggleProps): React.JSX.Element => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Switch
      testID={props.testID}
      trackColor={{false: '#c4c4c4', true: '#4cd964'}}
      thumbColor={'#fff'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={enabled => {
        setIsEnabled(enabled);
        props.onChange(enabled);
      }}
      value={isEnabled}
    />
  );
};

export default Toggle;
