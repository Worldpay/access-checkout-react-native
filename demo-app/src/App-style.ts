// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ViewStyle } from 'react-native';

const appStyle:ViewStyle = {
  flex: 1,
};

const mainStyle:ViewStyle = {
  flex: 9,
};

const navStyle:ViewStyle = {
  flex: 1,
  backgroundColor: '#ddd',
  paddingTop: 20,
  justifyContent: 'center',
};

export default {
  app: appStyle,
  main: mainStyle,
  nav: navStyle,
};
