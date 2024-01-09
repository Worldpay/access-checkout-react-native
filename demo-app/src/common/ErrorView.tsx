import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import HView from './HView';

interface ErrorProps {
  error: Error;
}

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

export default class ErrorView extends Component<ErrorProps> {
  constructor(props: ErrorProps) {
    super(props);
  }

  render() {
    return (
      <HView style={styles.view}>
        <Text style={styles.prefix}>Error:</Text>
        <Text style={styles.text}>{this.props.error.message}</Text>
      </HView>
    );
  }
}
