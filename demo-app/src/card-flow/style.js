import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  cardFlow: {
    margin:12,
    flex: 1,
    ...Platform.select({
      ios: {
        marginTop: 50,
      },
    }),
  },
});
