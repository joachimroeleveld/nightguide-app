import React, { Component } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createAppContainer } from 'react-navigation';

import AppNavigator from './config/routes';
import { store, persistor } from './state/store';
import Toast from './components/Toast';

export default class App extends Component {
  state = { navigator: null };

  async componentDidMount() {
    // On Android, request location permission as soon as possible
    if (Platform.OS === 'android') {
      if (
        !(await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        ))
      ) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
      }
    }
  }

  render() {
    const AppContainer = createAppContainer(AppNavigator);

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.Fragment>
            <AppContainer />
            <Toast />
          </React.Fragment>
        </PersistGate>
      </Provider>
    );
  }
}
