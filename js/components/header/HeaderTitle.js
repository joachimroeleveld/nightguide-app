import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Text from '../Text';

function HeaderTitle({ title, style }) {
  return <Text style={[styles.title, style]}>{title}</Text>;
}

HeaderTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
  },
});
