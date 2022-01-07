import React from 'react';
import { StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  logo: {
    borderRadius: 5,
    flex: 2,
    margin: 12,
    marginLeft: 0,
    resizeMode: 'center',
  },
});

interface CardBrandImageProps {
  logo: string;
}

const CardBrandImage = (props: CardBrandImageProps) => {
  return (
    <Image
      testID="cardBrandImage"
      style={styles.logo}
      source={{
        uri: props.logo,
      }}
    />
  );
};

export default CardBrandImage;
