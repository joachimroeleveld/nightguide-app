import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import S from '../config/styles';

class Text extends React.PureComponent {
  static propTypes = {
    style: PropTypes.any,
  };

  render() {
    return (
      <RNText {...this.props} style={[styles.text, this.props.style]}>
        {this.props.children}
      </RNText>
    );
  }
}

export default Text;

const styles = StyleSheet.create({
  text: {
    fontFamily: S.text.fontFamily,
    letterSpacing: S.text.defaultLetterSpacing,
    color: S.colors.textDefault,
    fontSize: S.text.paragraph.fontSize,
  },
});
