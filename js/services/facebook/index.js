import { FBLoginManager } from 'react-native-facebook-login';
import { Platform } from 'react-native';

const PERMISSIONS = [
  'public_profile',
  'email',
  'user_gender',
  'user_birthday',
];

function showLoginDialog() {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      // The Facebook login library that we use uses an outdated version of the
      // Facebook SDK, which is why this must be set or the app will crash.
      // @TODO use react-native-fbsdk when crash on iOS is resolved
      FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.WebView);
    }
    FBLoginManager.loginWithPermissions(PERMISSIONS, (error, data) => {
      if (error) {
        return reject(error);
      }

      resolve(data);
    });
  });
}

export default {
  showLoginDialog,
};