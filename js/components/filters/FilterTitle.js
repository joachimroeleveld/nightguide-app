import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Text from '../Text';

export default function FilterTitle({ title, style }) {
  return <Text style={[styles.title, style]}>{title}</Text>;
}

FilterTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    marginBottom: 6,
  },
});
