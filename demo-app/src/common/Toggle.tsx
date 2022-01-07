import React, { useState } from "react";
import { Switch } from "react-native";
// @ts-ignore
import UIComponentProps from "./UIComponentProps";

interface ToggleProps extends UIComponentProps {
  onChange(enabled: boolean): void;
}

const Toggle = (props: ToggleProps) => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Switch
      testID={props.testID}
      trackColor={{ false: "#767577", true: "#519259" }}
      thumbColor={isEnabled ? "#95D1CC" : "#292C6D"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={(enabled) => {
        setIsEnabled(enabled);
        props.onChange(enabled);
      }}
      value={isEnabled}
    />
  );
};

export default Toggle;
