import React from 'react';
import { StyleSheet, View } from 'react-native';

import S from '../config/styles';
import Text from './Text';

const Tag = ({ title, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.name}>{title}</Text>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({
  container: {
    borderColor: S.colors.tagBorderColor,
    backgroundColor: '#1E1E1E',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 16,
  },
  name: {
  },
});
