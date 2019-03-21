import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import S from '../config/styles';

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

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback style={styles.touchContainer}>
          <TouchableWithoutFeedback style={styles.modal} onPress={() => {}}>
            {this.props.children}
          </TouchableWithoutFeedback>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default Modal;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
  },
  touchContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
  },
  modal: {
    height: '50%',
    backgroundColor: S.colors.defaultScreenColor,
    marginHorizontal: S.dimensions.screenOffset,
  },
});
