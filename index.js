import { AppRegistry } from 'react-native';

import App from './js/App';
import { name as appName } from './app.json';

import './js/services/sentry';
import './js/services/analytics';

AppRegistry.registerComponent(appName, () => App);
