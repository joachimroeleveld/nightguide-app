import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import asScreen from '../screens/asScreen';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';

const AppStack = createStackNavigator({ Home: asScreen()(HomeScreen) });
const AuthStack = createStackNavigator({
  SignIn: asScreen({
    backgroundImage: require('../img/splash-bg.png'),
  })(SignInScreen),
});

export default createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
);
