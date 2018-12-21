import React from 'react';
import { StyleSheet, View } from 'react-native';

const Header = props => (
  <View
    style={[styles.container, props.absolute && styles.absolute, props.style]}
  >
    {props.children}
  </View>
);

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 10,
  },
  absolute: {
    zIndex: 1,
    position: 'absolute',
  },
});
