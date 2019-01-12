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
import ProfileScreen from '../../screens/ProfileScreen';
import FeedbackScreen from '../../screens/FeedbackScreen';
import ListScreen from '../../screens/ListScreen';

import { fadeTransition } from './transitionConfigs';
import S from '../styles';

const mainStackScreen = asScreen({});

const mainStack = {
  Tabs: {
    screen: createBottomTabNavigator(
      {
        List: mainStackScreen(ListScreen),
        Explore: mainStackScreen(ExploreScreen),
        Profile: mainStackScreen(ProfileScreen),
      },
      {
        defaultNavigationOptions: {
          header: null,
        },
        tabBarOptions: {
          activeTintColor: S.tabBar.activeTintColor,
          inactiveTintColor: S.tabBar.inactiveTintColor,
          upperCaseLabel: true,
          style: S.tabBar.container,
          labelStyle: S.tabBar.label,
        },
      }
    ),
  },
};

const fadeModals = {
  Search: {
    screen: asScreen()(SearchScreen),
  },
};

const bottomModalScreen = asScreen({ isBottomModal: true });

const fromBottomModals = {
  Feedback: {
    screen: bottomModalScreen(FeedbackScreen),
  },
};

const AppStack = createStackNavigator(
  {
    Main: {
      screen: createStackNavigator(
        {
          MainInner: {
            screen: createStackNavigator(mainStack, {
              headerMode: 'none',
            }),
          },
          ...fromBottomModals,
        },
        {
          headerMode: 'none',
          mode: 'modal',
        }
      ),
    },
    ...fadeModals,
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
    headerMode: 'none',
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
