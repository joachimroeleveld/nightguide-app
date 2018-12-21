import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import asScreen from '../../screens/asScreen';
import HomeScreen from '../../screens/HomeScreen';
import SplashScreen from '../../screens/SplashScreen';
import LoginScreen from '../../screens/LoginScreen';
import SignupScreen from '../../screens/SignupScreen';
import ResetPasswordScreen from '../../screens/ResetPasswordScreen';

const authStackScreen = asScreen({});

const AuthStack = createStackNavigator(
  {
    Splash: authStackScreen(SplashScreen),
    Login: authStackScreen(LoginScreen),
    Signup: authStackScreen(SignupScreen),
    ResetPassword: authStackScreen(ResetPasswordScreen),
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  }
);

const AppStack = createStackNavigator({ Home: asScreen()(HomeScreen) });

export default createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
);
