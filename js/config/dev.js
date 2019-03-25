import { NativeModules, YellowBox, Platform } from 'react-native';

if (__DEV__) {
  if (Platform.OS === 'ios') {
    NativeModules.DevSettings.setIsDebuggingRemotely(true);
  }
  YellowBox.ignoreWarnings(['Module RCTMFBLoginManager']);
}
