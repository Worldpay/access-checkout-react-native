import React from 'react';
import { StyleSheet, Image } from 'react-native';
// @ts-ignore
import UIComponentProps from "./UIComponentProps";

const styles = StyleSheet.create({
  logo: {
    borderRadius: 5,
    flex: 2,
    margin: 12,
    marginLeft: 0,
    resizeMode: 'center',
  },
});

interface CardBrandImageProps extends UIComponentProps{
  logo: string;
}

const CardBrandImage = (props: CardBrandImageProps) => {
  return (
    <Image
      testID={props.testID}
      style={styles.logo}
      source={{
        uri: props.logo,
      }}
    />
  );
};

export default CardBrandImage;
