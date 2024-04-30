import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {UIComponentProps} from '../UIComponentProps';

interface SessionLabelProps extends UIComponentProps {
  label: string;
  session: string;
}

const SessionLabel = (props: SessionLabelProps): React.JSX.Element => {
  return (
    <View style={styles.sessionLabelContainer}>
      <View style={styles.tagContainer}>
        <Text style={styles.tagText}>{props.label}</Text>
      </View>
      <Text testID={props.testID} style={styles.sessionValue}>
        {props.session}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sessionLabelContainer: {
    flexDirection: 'column',
    marginTop: '2%',
  },
  tagContainer: {
    padding: 5,
    backgroundColor: '#dd4f50',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tagText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
  },
  sessionValue: {
    borderWidth: 2,
    borderColor: '#dd4f50',
    padding: 5,
    fontSize: 11,
    flexWrap: 'wrap',
  },
});

export default SessionLabel;
