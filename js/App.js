import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createAppContainer } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';

import AppNavigator from './config/routes';
import { store, persistor } from './state/store';
import Toast from './components/Toast';
import LocationManager from './components/LocationManager';

export default class App extends Component {
  state = { navigator: null };

  async componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    const AppContainer = createAppContainer(AppNavigator);

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.Fragment>
            <LocationManager />
            <AppContainer />
            <Toast />
          </React.Fragment>
        </PersistGate>
      </Provider>
    );
  }
}
