import { AppRegistry } from 'react-native';
import { Sentry } from 'react-native-sentry';

import constants from './js/config/constants';
import App from './js/App';
import { name as appName } from './app.json';

if (!__DEV__) {
  Sentry.config(constants.sentryDsn).install();
}

AppRegistry.registerComponent(appName, () => App);
