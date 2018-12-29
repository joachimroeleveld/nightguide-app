import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';

import S from '../config/styles';
import Text from './Text';

class DatePicker extends React.PureComponent {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    onSelect: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isPickerVisible: false,
    };
  }

  togglePicker = () => {
    this.setState({
      isPickerVisible: !this.state.isPickerVisible,
    });
  };

  onConfirm = date => {
    this.setState({ isPickerVisible: false });

    this.props.onSelect(date);
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.togglePicker}>
          <Text style={styles.value}>
            {(this.props.date &&
              dateFns.format(this.props.date, 'DD-MM-YYYY')) ||
              ' '}
          </Text>
        </TouchableWithoutFeedback>
        <DateTimePicker
          isVisible={this.state.isPickerVisible}
          onCancel={this.togglePicker}
          date={this.props.date}
          {...this.props}
          onConfirm={this.onConfirm}
        />
      </View>
    );
  }
}

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    ...S.inputs.containerStyle,
  },
  value: {},
});
