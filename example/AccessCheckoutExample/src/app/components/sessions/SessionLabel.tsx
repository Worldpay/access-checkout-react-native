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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: '2%',
  },
  tagContainer: {
    flex: 2,
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#dd4f50',
    borderRadius: 10,
  },
  tagText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
  },
  sessionValue: {
    flex: 7,
    fontSize: 11,
    flexWrap: 'wrap',
  },
});

export default SessionLabel;
