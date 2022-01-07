import React from "react";
import { Text, View } from "react-native";

interface SessionLabelProps {
  testID: string;
  label: string;
  session: string;
}

const SessionLabel = (props: SessionLabelProps) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ fontSize: 11 }}>{props.label}</Text>
      <Text testID={props.testID} style={{ fontSize: 11 }}>{props.session}</Text>
    </View>
  );
};

export default SessionLabel;


