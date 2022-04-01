import React, { Component } from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';

export default class HView extends Component<ViewProps> {
  constructor(props: ViewProps) {
    super(props);
  }

  render() {
    const { children, ...rest } = this.props;
    const style = [this.props.style];

    const customStyle: ViewStyle = {};
    customStyle.flexDirection = 'row';

    style.push(customStyle);

    return (
      <View style={style} {...rest}>
        {children}
      </View>
    );
  }
}
