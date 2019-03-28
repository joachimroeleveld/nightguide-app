import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

let config = {
  apiUrl: 'https://api.nightguide.app',
  apiToken: 'fg!Q3LqaoZETh%bedXSB',
  sentryDsn: 'https://11fec49290754c04a4090c5a5f7394c1@sentry.io/1400408',
};

const devConfig = {
  apiUrl: 'http://localhost:8080',
  apiToken: 'token',
};

if (__DEV__) {
  if (Platform.OS === 'android' && DeviceInfo.isEmulator()) {
    devConfig.apiUrl = 'http://10.0.2.2:8080';
  }
  config = Object.assign(config, devConfig);
}

export default config;
