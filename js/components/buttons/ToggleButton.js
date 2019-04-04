import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Text from '../Text';
import S from '../../config/styles';

function ToggleButton({ title, style, active, onPress, type = null }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, active && styles.containerActive, style]}>
        <Text style={[styles.title, active && styles.titleActive]}>{title}</Text>
        {type === 'sort' && <Text>{'\u00f3n'}</Text>}
      </View>
    </TouchableOpacity>
  );
}

ToggleButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  active: PropTypes.string,
};

export default ToggleButton;

const styles = StyleSheet.create({
  container: {
    ...S.buttons.toggleButton,
  },
  containerActive: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 14,
  },
  titleActive: {
    color: S.colors.textDefault,
  },
});
