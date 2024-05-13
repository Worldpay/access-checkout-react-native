import React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {UIComponentProps} from '../UIComponentProps';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    backgroundColor: '#1b1b1b',
    padding: 20,
    borderRadius: 20,
  },
});

interface SpinnerProps extends UIComponentProps {
  show: boolean;
}

const Spinner = (props: SpinnerProps): React.JSX.Element => {
  return (
    <View style={[styles.container]} testID={props.testID}>
      <View style={[styles.indicator]}>
        <ActivityIndicator animating={props.show} size="large" color="red" />
      </View>
    </View>
  );
};

export default Spinner;
