import React from 'react';
import { View, StyleSheet, TextInput as RNTextInput } from 'react-native';

import S from '../config/styles';

class TextInput extends React.PureComponent {
  static propTypes = {
    ...RNTextInput.propTypes,
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          this.props.multiline && styles.multilineContainer,
          this.props.style,
        ]}
      >
        <RNTextInput
          {...this.props}
          placeholderTextColor={S.colors.inputs.placeholderColor}
          style={[
            styles.textInput,
            this.props.multiline && styles.multilineInput,
          ]}
        />
      </View>
    );
  }
}

export default TextInput;

const styles = StyleSheet.create({
  container: {
    ...S.inputs.containerStyle,
  },
  multilineContainer: {
    paddingVertical: 4,
  },
  textInput: {
    color: S.colors.textDefault,
    fontSize: 15,
    paddingVertical: 0,
  },
  multilineInput: {
    textAlignVertical: 'top',
    height: '100%',
  },
});
