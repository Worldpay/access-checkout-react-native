import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginTop: 50,
      },
    }),
  },
  row: {
    flexDirection: 'row',
  },
  submitView: {
    margin: 12,
    height: 40,
    justifyContent: 'center',
  },
});
