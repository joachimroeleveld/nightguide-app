import { AppRegistry } from 'react-native';

import App from './js/App';
import { name as appName } from './app.json';
import sentry from './js/services/sentry';
import analytics from './js/services/analytics';

sentry.configure();
analytics.configure();

AppRegistry.registerComponent(appName, () => App);
