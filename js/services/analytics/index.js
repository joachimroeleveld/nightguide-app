import _ from 'lodash';
import firebase from 'react-native-firebase';

import navigation from '../navigation';
import * as events from './eventBus';

export const eventBus = events;

const analytics = firebase.analytics();

const SESSION_TIMEOUT_DURATION = 1800000; // 30 minutes
const SESSION_MINIMUM_DURATION = 5000; // 5 seconds

function configure() {
  analytics.setSessionTimeoutDuration(SESSION_TIMEOUT_DURATION);
  analytics.setMinimumSessionDuration(SESSION_MINIMUM_DURATION);
}

function handleNavigationChange(prevState, newState) {
  const prevRoute = navigation.getActiveRouteName(prevState);
  const newRoute = navigation.getActiveRouteName(newState);
  if (newRoute !== prevRoute) {
    analytics.setCurrentScreen(newRoute);
    // Log screens as events too, for usage in funnels
    // https://blog.theodo.fr/2018/01/building-google-analytics-funnel-firebase-react-native/
    analytics.logEvent(`screen_${_.snakeCase(newRoute)}`, {});
  }
}

function setUserProperty(name, val) {
  analytics.setUserProperty(name, val);
}

export default {
  configure,
  handleNavigationChange,
  setUserProperty,
};
