import React from 'react';
import { StyleSheet, TextInput as RNTextInput } from 'react-native';
import PropTypes from 'prop-types';

import S from '../config/styles';

class TextInput extends React.PureComponent {
  static propTypes = {
    ...RNTextInput.propTypes,
  };

  render() {
    return (
      <RNTextInput {...this.props} style={styles.textInput} />
    );
  }
}

export default TextInput;

const styles = StyleSheet.create({
  textInput: {
    borderBottomColor: S.colors.inputs.borderColor,
    borderBottomWidth: 1,
    color: S.colors.textDefault,
    fontSize: 16,
    paddingVertical: 6,
  },
});
