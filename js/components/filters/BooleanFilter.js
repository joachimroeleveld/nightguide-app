import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import Text from '../Text';
import Checkbox from '../forms/Checkbox';

export default function BooleanFilter({ value, label, onValueChange, style }) {
  return (
    <TouchableWithoutFeedback onPress={() => onValueChange(!value)}>
      <View style={[styles.container, style]}>
        <Text style={styles.label}>{label}</Text>
        <Checkbox value={value} />
      </View>
    </TouchableWithoutFeedback>
  );
}

BooleanFilter.propTypes = {
  value: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  label: {
    flexGrow: 1,
  },
});
