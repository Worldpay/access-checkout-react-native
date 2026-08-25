import React, { Component } from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';

export default class VView extends Component<ViewProps> {
  constructor(props: ViewProps) {
    super(props);
  }

  render() {
    const { children, style, testID, ...rest } = this.props;

    const styles: StyleProp<ViewStyle> = [
      { flexDirection: 'column', display: 'flex' },
      style,
    ];

    return (
      <View style={styles} testID={testID} {...rest}>
        {children}
      </View>
    );
  }
}
