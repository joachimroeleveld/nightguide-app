import React from 'react';
import { SafeAreaView } from 'react-navigation';
import {
  StyleSheet,
  StatusBar,
  View,
  Image,
  SafeAreaView as RNSafeAreaView,
} from 'react-native';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { withNavigation } from 'react-navigation';

import ErrorMessageHandler from '../components/ErrorMessageHandler';
import S from '../config/styles';

/**
 * HOC that wraps a component with a screen component.
 */
export default function asScreen(screenOpts = {}) {
  return WrappedComponent => {
    const { backgroundImage, errorMessages} = Object.assign(
      screenOpts,
      WrappedComponent.screenOptions
    );

    const WithNavWrappedComponent = withNavigation(WrappedComponent);

    class AsScreen extends React.PureComponent {
      render() {
        const SafeAreaViewComponent = screenOpts.isBottomModal
          ? RNSafeAreaView
          : SafeAreaView;
        return (
          <View style={styles.bgContainer}>
            {!!backgroundImage && (
              <Image source={backgroundImage} style={styles.bgImage} />
            )}
            <SafeAreaViewComponent style={styles.container}>
              <ErrorMessageHandler errorMessages={errorMessages} />
              <StatusBar barStyle="light-content" />
              <WithNavWrappedComponent />
            </SafeAreaViewComponent>
          </View>
        );
      }
    }

    // As per: https://facebook.github.io/react/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
    AsScreen.displayName = `AsScreen(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    // Copy over any statics
    hoistNonReactStatics(AsScreen, WrappedComponent);

    return AsScreen;
  };
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: S.colors.defaultScreenColor,
  },
  container: {
    flex: 1,
  },
  bottomModalContainerInner: {},
  bgImage: {
    width: '100%',
    position: 'absolute',
    resizeMode: 'cover',
    alignSelf: 'center',
  },
});
