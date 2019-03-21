import React from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Text from './Text';

class SmallButton extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  };

  render() {
    return (
      <TouchableWithoutFeedback
        disabled={this.props.disabled}
        onPress={this.props.onPress}
      >
        <Text style={styles.button}>{this.props.title}</Text>
      </TouchableWithoutFeedback>
    );
  }
}

export default SmallButton;

const styles = StyleSheet.create({
  button: {
    fontSize: 13,
    color: '#BEBEBE',
    borderColor: '#4F4F4F',
    borderWidth: 1,
    borderRadius: 4,
    marginLeft: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
