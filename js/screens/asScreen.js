import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, StatusBar, View, Image } from 'react-native';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { withNavigation } from 'react-navigation';

import ErrorMessageHandler from '../components/ErrorMessageHandler';
import colors from '../config/styles/colors';

/**
 * HOC that wraps a component with a screen component.
 */
export default function asScreen(defaultScreenOpts = {}) {
  return WrappedComponent => {
    const { backgroundImage, errorMessages } = Object.assign(
      defaultScreenOpts,
      WrappedComponent.screenOptions
    );

    const WithNavWrappedComponent = withNavigation(WrappedComponent);

    class AsScreen extends React.PureComponent {
      render() {
        return (
          <View style={styles.bgContainer}>
            {!!backgroundImage && (
              <Image source={backgroundImage} style={styles.bgImage} />
            )}
            <SafeAreaView style={styles.container}>
              <ErrorMessageHandler errorMessages={errorMessages} />
              <StatusBar barStyle="light-content" />
              <WithNavWrappedComponent />
            </SafeAreaView>
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
    backgroundColor: colors.defaultScreenColor,
  },
  container: {
    flex: 1,
  },
  bgImage: {
    width: '100%',
    position: 'absolute',
    resizeMode: 'cover',
    alignSelf: 'center',
  },
});
