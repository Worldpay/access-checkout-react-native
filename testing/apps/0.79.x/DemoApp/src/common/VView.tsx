import React, { Component } from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';

export default class VView extends Component<ViewProps> {
  constructor(props: ViewProps) {
    super(props);
  }

  render() {
    const { children, style, ...rest } = this.props;

    const styles: ViewStyle = {};
    styles.flexDirection = 'column';
    styles.display = 'flex';

    Object.assign(styles, style);

    return (
      <View style={styles} {...rest}>
        {children}
      </View>
    );
  }
}
