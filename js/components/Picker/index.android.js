import React from 'react';
import { Picker as RNPicker, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import S from '../../config/styles';

class PickerAndroid extends React.PureComponent {
  static propTypes = {
    selectedValue: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    title: PropTypes.string,
  };

  handleValueChange = selectedValue => {
    this.props.onSelect(selectedValue);
  };

  render() {
    return (
      <View style={styles.container}>
        <RNPicker
          style={{ color: '#fff' }}
          prompt={this.props.title}
          selectedValue={this.props.selectedValue}
          onValueChange={this.handleValueChange}
        >
          {this.props.children}
        </RNPicker>
      </View>
    );
  }
}

export default PickerAndroid;

const styles = StyleSheet.create({
  container: {
    ...S.inputs.containerStyle,
    paddingVertical: 0,
  },
});
