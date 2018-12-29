import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from './Text';

const LabeledText = props => {
  return (
    <View style={[styles.labeledText, props.style]}>
      <Text style={styles.label}>{props.label.toUpperCase()}</Text>
      <Text>{props.children}</Text>
    </View>
  );
};

export default LabeledText;

const styles = StyleSheet.create({
  labeledText: {},
  label: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: '700',
  },
});
