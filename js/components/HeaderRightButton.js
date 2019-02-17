import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Text from './Text';

const HeaderRightButton = props => (
  <TouchableOpacity onPress={props.onPress}>
    <Text style={styles.text}>{props.title}</Text>
  </TouchableOpacity>
);

export default HeaderRightButton;

const styles = StyleSheet.create({
  text: {
  },
});
