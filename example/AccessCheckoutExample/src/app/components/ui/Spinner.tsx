import React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {UIComponentProps} from '../UIComponentProps';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
});

interface SpinnerProps extends UIComponentProps {
  show: boolean;
}

const Spinner = (props: SpinnerProps): React.JSX.Element => {
  return (
    <View style={[styles.container]} testID={props.testID}>
      <ActivityIndicator animating={props.show} size="large" color="red" />
    </View>
  );
};

export default Spinner;
