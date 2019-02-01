import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import asScreen from '../../screens/asScreen';
import IntroScreen from '../../screens/IntroScreen';
import ExploreScreen from '../../screens/ExploreScreen';
import SplashScreen from '../../screens/SplashScreen';
import LoginScreen from '../../screens/LoginScreen';
import SignupScreen from '../../screens/SignupScreen';
import ResetPasswordScreen from '../../screens/ResetPasswordScreen';
import SearchScreen from '../../screens/SearchScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import FeedbackScreen from '../../screens/FeedbackScreen';
import ListScreen from '../../screens/ListScreen';
import VenueScreen from '../../screens/VenueScreen'

import { fadeTransition } from './transitionConfigs';
import S from '../styles';

const mainStack = {
  Tabs: createBottomTabNavigator(
    {
      List: asScreen({})(ListScreen),
      Explore: asScreen({})(ExploreScreen),
      Profile: asScreen({})(ProfileScreen),
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
  Venue: asScreen({ bleed: true })(VenueScreen),
};

const fadeModals = {
  Search: asScreen()(SearchScreen),
};

const bottomModalScreen = asScreen({ isBottomModal: true });

const fromBottomModals = {
  Feedback: bottomModalScreen(FeedbackScreen),
};

const AppStack = createStackNavigator(
  {
    Main: createStackNavigator(
      {
        MainInner: createStackNavigator(mainStack, {
          headerMode: 'none',
        }),
        ...fromBottomModals,
      },
      {
        headerMode: 'none',
        mode: 'modal',
      }
    ),
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

const introScreen = asScreen({});

const IntroStack = createStackNavigator(
  {
    Location: introScreen(IntroScreen),
  },
  {
    headerMode: 'none',
  }
);

export default createSwitchNavigator(
  {
    App: AppStack,
    Intro: IntroStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
);
