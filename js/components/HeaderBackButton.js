import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withNavigation, NavigationActions } from 'react-navigation';

import S from '../config/styles';
import ImageButton from './ImageButton';

const HeaderBackButton = props => (
  <View style={styles.container}>
    <ImageButton
      size={16}
      image={require('../img/header-back.png')}
      onPress={
        props.onPress ||
        (() => props.navigation.dispatch(NavigationActions.back()))
      }
      style={styles.button}
    />
  </View>
);

export default withNavigation(HeaderBackButton);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  button: {
    tintColor: S.colors.textDefault,
  },
});
