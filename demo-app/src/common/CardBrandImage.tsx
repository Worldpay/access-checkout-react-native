import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import UIComponentProps from './UIComponentProps';

const styles = StyleSheet.create({
  view: {
    width: 80,
  },
  logo: {
    borderRadius: 5,
    flex: 2,
    margin: 12,
    marginLeft: 0,
    resizeMode: 'center',
  },
});

interface CardBrandImageProps extends UIComponentProps {
  logo: string;
}

const CardBrandImage = (props: CardBrandImageProps) => {
  let image;
  if (props.logo) {
    image = (
      <Image
        testID={props.testID}
        style={styles.logo}
        source={{ uri: props.logo }}
      />
    );
  }

  return <View style={styles.view}>{image}</View>;
};

export default CardBrandImage;
