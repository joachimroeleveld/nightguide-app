import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '../config/styleVars';
import Text from './Text';

class Button extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    titleStyle: PropTypes.object,
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        {...this.props}
        style={[styles.button, this.props.style]}
      >
        <Text style={[styles.title, this.props.titleStyle]}>
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
});
