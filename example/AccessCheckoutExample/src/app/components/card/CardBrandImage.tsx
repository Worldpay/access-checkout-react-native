import React, {useEffect, useState} from 'react';
import {StyleSheet, Image} from 'react-native';

import {UIComponentProps} from '../UIComponentProps.ts';
import {Brand} from '@worldpay/access-worldpay-checkout-react-native-sdk';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

interface CardBrandImageProps extends UIComponentProps {
  brand?: Brand;
}

const unknownBrandLogo = require('./img/card_unknown.png');

const CardBrandImage = (props: CardBrandImageProps): React.JSX.Element => {
  const [brandLogo, setBrandLogo] =
    useState<ImageSourcePropType>(unknownBrandLogo);

  useEffect(() => {
    if (!props.brand) {
      setBrandLogo(unknownBrandLogo);
      return;
    }
    for (const image of props.brand.images) {
      if (image.type === 'image/png') {
        setBrandLogo({uri: image.url});
      }
    }
  }, [props.brand]);

  return <Image testID={props.testID} style={styles.logo} source={brandLogo} />;
};

const styles = StyleSheet.create({
  logo: {
    borderRadius: 5,
    flex: 2,
    margin: 12,
    marginLeft: 0,
    height: 40,
    resizeMode: 'center',
  },
});

export default CardBrandImage;
