import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal as RNModal,
} from 'react-native';
import PropTypes from 'prop-types';

import S from '../../config/styles';
import Text from '../Text';
import ImageButton from '../ImageButton';

class Index extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
  };

  state = {
    rendered: !!this.props.visible,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.visible !== prevProps.visible) {
      this.setState({ rendered: true });
      this.toggleModal();
    }
  }

  toggleModal = () => {};

  requestClose = () => this.props.onRequestClose();

  render() {
    if (!this.state.rendered) {
      return null;
    }

    return (
      <RNModal
        transparent={true}
        presentationStyle={'overFullScreen'}
        visible={this.props.visible}
        animationType={'fade'}
        style={styles.container}
        onRequestClose={this.requestClose}
      >
        <TouchableWithoutFeedback onPress={this.requestClose}>
          <View style={styles.bgContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modal}>
                <View style={styles.header}>
                  <Text style={styles.title}>{this.props.title}</Text>
                  <ImageButton
                    image={require('./img/close_button.png')}
                    onPress={this.props.onRequestClose}
                    style={styles.closeButton}
                  />
                </View>
                {this.props.children}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </RNModal>
    );
  }
}

export default Index;

const styles = StyleSheet.create({
  bgContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
  },
  modal: {
    maxHeight: '80%',
    backgroundColor: S.colors.defaultScreenColor,
    marginHorizontal: S.dimensions.screenOffset,
    shadowRadius: 7,
    shadowColor: 'rgba(0,0,0,0.50)',
    shadowOffset: { height: 4 },
    borderRadius: 3,
    paddingHorizontal: S.dimensions.screenOffset,
    paddingTop: 12,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    ...S.text.h2,
  },
  closeButton: {
    position: 'absolute',
    right: -8,
    top: -3,
  },
});
