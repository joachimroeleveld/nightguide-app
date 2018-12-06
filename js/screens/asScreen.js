import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import hoistNonReactStatics from 'hoist-non-react-statics';

import { AndroidBackHandler } from '../components/BackHandler';
import Toast from '../components/Toast';
import { colors } from '../config/styleVars';

/**
 * HOC that wraps a component with a screen component.
 */
export default function asScreen(opts = {}) {
  return WrappedComponent => {
    class AsScreen extends React.PureComponent {
      render() {
        return (
          <SafeAreaView style={styles.container}>
            <AndroidBackHandler />

            <WrappedComponent />

            <Toast />
          </SafeAreaView>
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
  container: {
    flex: 1,
    backgroundColor: colors.defaultScreenColor,
  },
});
