import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createAppContainer } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';

import AppNavigator from './config/routes';
import { store, persistor } from './state/store';
import Toast from './components/Toast';
import LocationManager from './components/LocationManager';
import sentry from './services/sentry';
import analytics from './services/analytics';

YellowBox.ignoreWarnings(['Module RCTMFBLoginManager']);

export default class App extends Component {
  state = { navigator: null };

  async componentDidMount() {
    SplashScreen.hide();
  }

  onNavigationStateChange = (prevState, newState, action) => {
    sentry.addNavigationBreadCrumb(action);
    analytics.handleNavigationChange(prevState, newState, action);
  };

  render() {
    const AppContainer = createAppContainer(AppNavigator);

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.Fragment>
            <LocationManager />
            <AppContainer
              onNavigationStateChange={this.onNavigationStateChange}
            />
            <Toast />
          </React.Fragment>
        </PersistGate>
      </Provider>
    );
  }
}
