import React from 'react';
import { Picker as RNPicker, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import S from '../../config/styles';
import __ from '../../services/i18n';

const VALUE_NONE = '_none';

class PickerAndroid extends React.PureComponent {
  static propTypes = {
    selectedValue: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    title: PropTypes.string,
  };

  static defaultProps = {
    selectedValue: VALUE_NONE,
  };

  handleValueChange = selectedValue => {
    this.props.onSelect(selectedValue === VALUE_NONE ? null : selectedValue);
  };

  render() {
    return (
      <View style={styles.container}>
        <RNPicker
          style={styles.itemStyle}
          prompt={this.props.title}
          selectedValue={this.props.selectedValue}
          onValueChange={this.handleValueChange}
        >
          <RNPicker.Item value={VALUE_NONE} label={__('pickerChoose')} />
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
  itemStyle: {
    color: '#fff',
  },
});
