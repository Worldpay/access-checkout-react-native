import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface ErrorProps {
  error: Error;
}

const ErrorDisplayContainer = (props: ErrorProps): React.JSX.Element => (
  <View style={styles.view}>
    <Text style={styles.prefix}>Error:</Text>
    <Text style={styles.text}>{props.error.message}</Text>
  </View>
);

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    marginTop: '2%',
    marginRight: '2%',
  },
  prefix: {
    fontSize: 11,
    color: 'red',
    fontWeight: 'bold',
    marginRight: 5,
  },
  text: {
    fontSize: 11,
    color: 'red',
  },
});

export default ErrorDisplayContainer;
