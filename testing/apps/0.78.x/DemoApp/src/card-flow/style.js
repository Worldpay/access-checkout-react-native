import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  cardFlow: {
    margin: 12,
    ...Platform.select({
      ios: {
        marginTop: 50,
      },
    }),
  },
  cvc: {
    flex: 1,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 40,
  },
  pan: {
    flex: 8,
    margin: 12,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 40,
  },
  expiry: {
    flex: 1,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 40,
  },
});
