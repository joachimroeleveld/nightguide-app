import React from 'react';
import { StyleSheet, View } from 'react-native';

const Header = props => (
  <View style={[styles.container, props.style]}>{props.children}</View>
);

export default Header;

const styles = StyleSheet.create({
  container: {
  },
});
