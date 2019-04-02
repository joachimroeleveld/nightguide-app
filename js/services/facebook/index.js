const FBSDK = require('react-native-fbsdk');
const { LoginManager, AccessToken } = FBSDK;

const PERMISSIONS = [
  'public_profile',
  'email',
  // 'user_gender',
  // 'user_birthday',
];

async function showLoginDialog() {
  const {
    isCanceled,
    grantedPermissions,
  } = await LoginManager.logInWithReadPermissions(PERMISSIONS);
  if (!isCanceled) {
    const token = await AccessToken.getCurrentAccessToken();
    return {
      grantedPermissions,
      token,
    };
  } else {
    return { isCanceled: true };
  }
}

export default {
  showLoginDialog,
};
