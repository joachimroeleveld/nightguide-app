import sentry from '../sentry';

export function handleError(ex, logger) {
  if (ex.handled) {
    return;
  }

  if (__DEV__) {
    /*eslint no-console:0*/
    console.error && console.error(ex);
  } else {
    if (!(logger === 'api' && ex.code < 500)) {
      sentry.handleError(ex, logger);
    }
  }

  ex.handled = true;
}
