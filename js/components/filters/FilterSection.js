import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import S from '../../config/styles';
import FilterTitle from './FilterTitle';

export default function FilterSection({ title, showBorder, style, children }) {
  return (
    <View style={[styles.container, style, !!showBorder && styles.noBorder]}>
      {!!title && <FilterTitle title={title} />}
      {children}
    </View>
  );
}

FilterSection.propTypes = {
  title: PropTypes.string,
  showBorder: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: S.colors.separatorColor,
    paddingHorizontal: S.dimensions.screenOffset,
    paddingVertical: 14,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
});
