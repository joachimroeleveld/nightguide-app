import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import colors from '../config/styles/colors';
import Text from './Text';

class Button extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    darkTitle: PropTypes.bool,
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        {...this.props}
        style={[
          styles.button,
          this.props.disabled && styles.disabled,
          this.props.style,
        ]}
      >
        <Text style={[styles.title, this.props.darkTitle && styles.titleDark]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Button;

const styles = StyleSheet.create({
  button: {},
  title: {
    color: colors.textDefault,
    fontSize: 14,
    textAlign: 'center',
  },
  titleDark: {
    color: colors.textDark,
  },
  disabled: {
    opacity: 0.4,
  },
});
