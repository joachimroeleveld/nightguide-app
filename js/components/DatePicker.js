import React, { Fragment } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import dateFns from 'date-fns';

import Text from './Text';

import S from '../config/styles';
import PropTypes from 'prop-types';

class DatePicker extends React.PureComponent {
  static propTypes = {
    ...DateTimePicker.propTypes,
    date: PropTypes.instanceOf(Date),
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
    borderBottomColor: S.colors.inputs.borderColor,
    borderBottomWidth: 1,
    paddingVertical: 6,
  },
  value: {
  },
});
