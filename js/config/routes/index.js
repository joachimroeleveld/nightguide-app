import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import asScreen from '../../screens/asScreen';
import ExploreScreen from '../../screens/ExploreScreen';
import SplashScreen from '../../screens/SplashScreen';
import LoginScreen from '../../screens/LoginScreen';
import SignupScreen from '../../screens/SignupScreen';
import ResetPasswordScreen from '../../screens/ResetPasswordScreen';
import SearchScreen from '../../screens/SearchScreen';

import { fadeTransition } from './transitionConfigs'
import S from '../styles';

const mainStackScreen = asScreen({});

const MainStack = createBottomTabNavigator(
  {
    Explore: mainStackScreen(ExploreScreen),
  },
  {
    tabBarOptions: {
      activeTintColor: S.tabBar.activeTintColor,
      inactiveTintColor: S.tabBar.inactiveTintColor,
      upperCaseLabel: true,
      style: S.tabBar.container,
      labelStyle: S.tabBar.label,
    },
  }
);

const AppStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    Search: {
      screen: asScreen()(SearchScreen),
    },
  },
  {
    headerMode: 'none',
    transitionConfig: fadeTransition,
  }
);

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

export default createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
);
