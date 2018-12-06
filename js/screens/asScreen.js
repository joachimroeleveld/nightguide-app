import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, StatusBar, View, Image } from 'react-native';
import hoistNonReactStatics from 'hoist-non-react-statics';

import { AndroidBackHandler } from '../components/BackHandler';
import Toast from '../components/Toast';
import { colors } from '../config/styleVars';

/**
 * HOC that wraps a component with a screen component.
 */
export default function asScreen(opts = {}) {
  const { backgroundImage } = opts;

  return WrappedComponent => {
    class AsScreen extends React.PureComponent {
      render() {
        return (
          <View style={styles.bgContainer}>
            {!!backgroundImage && (
              <Image source={backgroundImage} style={styles.bgImage} />
            )}
            <SafeAreaView style={styles.container}>
              <StatusBar barStyle="light-content" />

              <AndroidBackHandler />

              <WrappedComponent />

              <Toast />
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
