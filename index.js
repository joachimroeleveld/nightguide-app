import { AppRegistry } from 'react-native';

import App from './js/App';
import { name as appName } from './app.json';
import sentry from './js/services/sentry';

sentry.configure();

AppRegistry.registerComponent(appName, () => App);
