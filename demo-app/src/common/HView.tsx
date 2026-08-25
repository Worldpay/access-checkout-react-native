import React, { Component } from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';

export default class HView extends Component<ViewProps> {
  constructor(props: ViewProps) {
    super(props);
  }

  render() {
    const { children, style, ...rest } = this.props;
    const styles: StyleProp<ViewStyle> = [
      { display: 'flex', flexDirection: 'row' },
      style,
    ];

    return (
      <View style={styles} {...rest}>
        {children}
      </View>
    );
  }
}
