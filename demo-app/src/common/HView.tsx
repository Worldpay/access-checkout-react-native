import React, { Component } from "react";
import { View, ViewProps, ViewStyle } from "react-native";

export default class HView extends Component<ViewProps> {
  constructor(props: ViewProps) {
    super(props);
  }

  render() {
    let { children, ...rest } = this.props;
    let style = [this.props.style];

    let customStyle:ViewStyle = {};
    customStyle.flexDirection = "row";

    style.push(customStyle);

    return (
      <View style={style} {...rest}>
        {children}
      </View>
    );
  }
};
