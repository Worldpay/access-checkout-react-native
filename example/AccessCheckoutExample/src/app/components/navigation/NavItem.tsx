import React from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';

const images = {
  card: {
    on: require('./img/card-on.png'),
    off: require('./img/card-off.png'),
  },
  cvc: {
    on: require('./img/cvc-on.png'),
    off: require('./img/cvc-off.png'),
  },
};

interface NavItemProps extends ViewProps {
  image: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  selected: boolean;
  title: string;
}
const NavItem = (props: NavItemProps): React.JSX.Element => {
  const {image, onPress, selected, style, title} = props;

  const imageFiles = (images as any)[image];
  const imageSource = selected ? imageFiles.on : imageFiles.off;

  return (
    <View
      testID={`nav-${image}`}
      style={[styles.navContainer, style]}
      onTouchStart={onPress}>
      <Image source={imageSource} />
      <Text style={[styles.text, {color: selected ? '#3C96F2' : '#A0A1A1'}]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    alignItems: 'center',
    width: 100,
  },
  text: {
    marginTop: 5,
    fontSize: 14,
  },
});

export default NavItem;
