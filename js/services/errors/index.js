export function handleError(ex) {
  if (__DEV__) {
    /*eslint no-console:0*/
    console.error && console.error(ex);
  }
}