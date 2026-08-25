import React, { Component } from 'react';
import {
  Image,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

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

interface NavItemProps extends Omit<PressableProps, 'style'> {
  image: keyof typeof images;
  selected: boolean;
  style?: StyleProp<ViewStyle>;
  title: string;
}

export default class NavItem extends Component<NavItemProps> {
  constructor(props: NavItemProps) {
    super(props);
  }

  render() {
    const { image, onPress, selected, style, title } = this.props;
    const imageFiles = images[image];
    const imageSource = selected ? imageFiles.on : imageFiles.off;

    const viewStyles: ViewStyle = {
      alignItems: 'center',
      width: 100,
    };

    const textStyles: TextStyle = {
      color: selected ? '#3C96F2' : '#A0A1A1',
      marginTop: 5,
      fontSize: 14,
    };

    return (
      <Pressable
        accessibilityRole="button"
        testID={`nav-${image}`}
        style={[viewStyles, style]}
        onPress={onPress}
      >
        <Image source={imageSource} />
        <Text style={textStyles}>{title}</Text>
      </Pressable>
    );
  }
}
