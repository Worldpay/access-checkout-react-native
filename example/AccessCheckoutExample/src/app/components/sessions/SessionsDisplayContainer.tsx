import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {UIComponentProps} from '../UIComponentProps';
import SessionLabel from './SessionLabel';

interface SessionsContainerProps extends UIComponentProps {
  cardSession?: string;
  cvcSession?: string;
}

const SessionsDisplayContainer = (
  props: SessionsContainerProps,
): React.JSX.Element => {
  return (
    <View style={styles.container}>
      {(props.cardSession || props.cvcSession) && (
        <Text style={styles.label}>Sessions</Text>
      )}
      {props.cardSession && (
        <SessionLabel
          testID="cardSession"
          label="Card session:"
          session={props.cardSession}
        />
      )}
      {props.cvcSession && (
        <SessionLabel
          testID="cvcSession"
          label="Cvc session:"
          session={props.cvcSession}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: '8%', marginLeft: '4%'},
  label: {fontWeight: 'bold'},
});
export default SessionsDisplayContainer;
