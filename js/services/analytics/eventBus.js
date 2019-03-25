import firebase from 'react-native-firebase';

const analytics = firebase.analytics();

export const PARAM_LOGIN_METHOD_NORMAL = 'normal';
export const PARAM_LOGIN_METHOD_FACEBOOK = 'facebook';
export const PARAM_LOGIN_METHOD_ANONYMOUS = 'anonymous';

export const PARAM_SIGNUP_METHOD_NORMAL = 'normal';
export const PARAM_SIGNUP_METHOD_FACEBOOK = 'facebook';

export function signup({ method }) {
  analytics.logEvent('sign_up', {
    method,
  });
}

export function login({ method, userId }) {
  analytics.logEvent('login', { method });
  if (userId) {
    analytics.setUserId(userId);
  }
}

export function loginWithIncorrectCredentials() {
  analytics.logEvent('login_incorrect_credentials');
}

export function resetPassword() {
  analytics.logEvent('reset_password', {});
}

export function updatePermission({ permission, value }) {
  analytics.logEvent('update_permission', {
    permission,
    value,
  });
}

export function submitFeedback() {
  analytics.logEvent('submit_feedback');
}

export function logout() {
  analytics.logEvent('logout');
}
