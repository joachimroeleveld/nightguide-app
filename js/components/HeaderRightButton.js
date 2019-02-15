import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Text from './Text';

const HeaderRightButton = props => (
  <TouchableOpacity onPress={props.onPress}>
    <Text style={styles.text}>{props.name}</Text>
  </TouchableOpacity>
);

export default HeaderRightButton;

const styles = StyleSheet.create({
  text: {
    lineHeight: 16,
    marginBottom: 16,
  },
});
