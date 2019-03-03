import { Sentry } from 'react-native-sentry';
import { NavigationActions } from 'react-navigation';

import constants from '../../config/constants';

function configure() {
  if (!__DEV__) {
    Sentry.config(constants.sentryDsn).install();
  }
}

function handleError(error, logger = undefined) {
  Sentry.captureException(error, {
    logger,
  });
}

function setUserContext(user) {
  Sentry.setUserContext({
    email: user.email,
    userID: user.id,
  });
}

function addBreadcrumb(message, category, data) {
  Sentry.captureBreadcrumb({
    message,
    category,
    data,
  });
}

function addNavigationBreadCrumb(action) {
  const { type, ...otherParams } = action;
  if ([NavigationActions.NAVIGATE, NavigationActions.BACK].includes(type)) {
    addBreadcrumb(action.type, 'navigation', otherParams);
  }
}

export default {
  configure,
  setUserContext,
  addBreadcrumb,
  handleError,
  addNavigationBreadCrumb,
};
