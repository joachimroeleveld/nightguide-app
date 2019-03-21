import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import S from '../config/styles';
import Text from './Text';
import SmallButton from './SmallButton';
import __ from '../services/i18n';

class Modal extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.show !== prevProps.show) {
      this.toggleModal();
    }
  }

  toggleModal = () => {};

  closeModal = () => {};

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.bg} />
        <TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modal}>
              <View style={styles.header}>
                <Text style={styles.title}>{this.props.title}</Text>
                <SmallButton
                  style={styles.closeButton}
                  onPress={this.closeModal}
                  title={__('close')}
                />
              </View>
              {this.props.children}
            </View>
          </TouchableWithoutFeedback>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default Modal;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    zIndex: 20,
    top: 0,
    left: 0,
    justifyContent: 'center',
  },
  bg: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  modal: {
    height: '50%',
    backgroundColor: S.colors.defaultScreenColor,
    marginHorizontal: S.dimensions.screenOffset,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    alignSelf: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
});
