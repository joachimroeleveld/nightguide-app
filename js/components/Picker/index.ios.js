import React from 'react';
import {
  Picker as RNPicker,
  StyleSheet,
  View,
  TouchableHighlight,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import _ from 'lodash';

import S from '../../config/styles';
import Text from '../Text';
import __ from '../../services/i18n';

class PickerIOS extends React.PureComponent {
  static propTypes = {
    selectedValue: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    title: PropTypes.string,
  };

  get selectedLabel() {
    return _.chain(this.props.children)
      .find(Item => Item.props.value === this.state.selectedValue)
      .get('props.label')
      .value();
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedValue: this.props.selectedValue,
      isPickerVisible: false,
    };
  }

  togglePicker = () => {
    this.setState({ isPickerVisible: !this.state.isPickerVisible });
  };

  handleUserTouchInit = () => {
    this.setState({
      userIsInteractingWithPicker: true,
    });
    return false;
  };

  handleValueChange = selectedValue => {
    this.setState({
      selectedValue,
      userIsInteractingWithPicker: false,
    });
  };

  handleCancel = () => {
    this.togglePicker();
  };

  handleConfirm = () => {
    let selectedValue = this.state.selectedValue;
    if (!selectedValue) {
      selectedValue = this.props.children[0].props.value;
      this.setState({ selectedValue });
    }

    this.togglePicker();
    this.props.onSelect(selectedValue);
  };

  render() {
    return (
      <React.Fragment>
        <TouchableWithoutFeedback onPress={this.togglePicker}>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{this.selectedLabel || ' '}</Text>
            <Image
              style={styles.triangle}
              source={require('../../img/dropdown-triangle.png')}
            />
          </View>
        </TouchableWithoutFeedback>
        <Modal
          style={[styles.contentContainer]}
          backdropOpacity={0.4}
          isVisible={this.state.isPickerVisible}
        >
          <View style={[styles.pickerContainer]}>
            {!!this.props.title && (
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{this.props.title}</Text>
              </View>
            )}
            <View onStartShouldSetResponderCapture={this.handleUserTouchInit}>
              <RNPicker
                selectedValue={this.state.selectedValue}
                onValueChange={this.handleValueChange}
              >
                {this.props.children}
              </RNPicker>
            </View>
            <TouchableHighlight
              style={styles.confirmButton}
              underlayColor="#ebebeb"
              onPress={this.handleConfirm}
              disabled={this.state.userIsInteractingWithPicker}
            >
              <Text style={[styles.confirmText]}>{__('confirm')}</Text>
            </TouchableHighlight>
          </View>

          <TouchableHighlight
            style={styles.cancelButton}
            underlayColor="#ebebeb"
            onPress={this.handleCancel}
          >
            <Text style={[styles.cancelText]}>{__('cancel')}</Text>
          </TouchableHighlight>
        </Modal>
      </React.Fragment>
    );
  }
}

export default PickerIOS;

const BORDER_COLOR = '#d5d5d5';
const BUTTON_FONT_WEIGHT = 'normal';
const BUTTON_FONT_COLOR = '#007ff9';
const BUTTON_FONT_SIZE = 20;
const BORDER_RADIUS = 13;
const TITLE_FONT_SIZE = 13;
const TITLE_COLOR = '#8f8f8f';

export const isIphoneX = () => {
  const { height, width } = Dimensions.get('window');

  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812 || (height === 896 || width === 896))
  );
};

const styles = StyleSheet.create({
  triangle: {
    tintColor: S.colors.textDefault,
    right: 4,
  },
  valueContainer: {
    ...S.inputs.containerStyle,
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    flexGrow: 1,
  },
  contentContainer: {
    justifyContent: 'flex-end',
    margin: 10,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    overflow: 'hidden',
  },
  titleContainer: {
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 14,
    backgroundColor: 'transparent',
  },
  name: {
    textAlign: 'center',
    color: TITLE_COLOR,
    fontSize: TITLE_FONT_SIZE,
  },
  confirmButton: {
    borderColor: BORDER_COLOR,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'transparent',
    height: 57,
    justifyContent: 'center',
  },
  confirmText: {
    textAlign: 'center',
    color: BUTTON_FONT_COLOR,
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: BUTTON_FONT_WEIGHT,
    backgroundColor: 'transparent',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderRadius: BORDER_RADIUS,
    height: 57,
    marginBottom: isIphoneX() ? 20 : 0,
    justifyContent: 'center',
  },
  cancelText: {
    padding: 10,
    textAlign: 'center',
    color: BUTTON_FONT_COLOR,
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
});
