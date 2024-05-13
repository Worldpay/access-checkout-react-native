import React, { Component } from 'react';
import {
  GestureResponderEvent,
  Image,
  Text,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';
import VView from '../common/VView';

const images = {
  card: {
    on: require('../assets/img/card-on.png'),
    off: require('../assets/img/card-off.png'),
  },
  cvc: {
    on: require('../assets/img/cvc-on.png'),
    off: require('../assets/img/cvc-off.png'),
  },
};

interface NavItemProps extends ViewProps {
  image: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  selected: boolean;
  title: string;
}

export default class NavItem extends Component<NavItemProps> {
  constructor(props: NavItemProps) {
    super(props);
  }

  render() {
    const { image, onPress, selected, style, title } = this.props;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const imageFiles = (images as any)[image];
    const imageSource = selected ? imageFiles.on : imageFiles.off;

    const viewStyles: ViewStyle = {};
    viewStyles.alignItems = 'center';
    viewStyles.width = 100;

    Object.assign(viewStyles, style);

    const textStyles: TextStyle = {
      color: selected ? '#3C96F2' : '#A0A1A1',
      marginTop: 5,
      fontSize: 14,
    };

    return (
      <VView testID={`nav-${image}`} style={viewStyles} onTouchStart={onPress}>
        <Image source={imageSource} />
        <Text style={textStyles}>{title}</Text>
      </VView>
    );
  }
}
