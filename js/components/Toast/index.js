import React from 'react';
import { StyleSheet, Animated, PanResponder, Image, View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import i18n from '../../services/i18n';
import Text from '../Text';

const CONTAINER_PADDING_TOP = 46;
const CONTAINER_PADDING_BOTTOM = 16;
const DURATION_DEFAULT = 2000;

class Toast extends React.Component {
  static types = [
    {
      name: 'ok',
      color: '#18c937',
      icon: require('./img/success-toast-icon.png'),
    },
    {
      name: 'warn',
      color: '#ff9712',
      icon: require('./img/error-toast-icon.png'),
    },
    {
      name: 'err',
      color: '#d81c1d',
      icon: require('./img/error-toast-icon.png'),
    },
  ];

  constructor(props) {
    super(props);

    this.message = null;
    this.lastMessageIndex = -1;
    this.queue = [];
    this.messageHeight = 0;
    this.panResponder = null;
    this.position = new Animated.Value(-100);
    this.type = new Animated.Value(0);

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dy < 0) {
          this.position.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (Math.abs(gestureState.dy) > this.containerHeight / 3) {
          this.hide();
        } else {
          Animated.timing(this.position, {
            duration: 100,
            toValue: 0,
          }).start();
        }
      },
    });

    this.state = {
      message: null,
    };
  }

  componentDidUpdate() {
    if (this.props.messages.length - 1 !== this.lastMessageIndex) {
      const newMessageIndex = this.lastMessageIndex + 1;

      this.queueMessage(this.props.messages[newMessageIndex]);

      this.lastMessageIndex = newMessageIndex;
    }
  }

  get containerHeight() {
    return (
      CONTAINER_PADDING_TOP + this.messageHeight + CONTAINER_PADDING_BOTTOM
    );
  }

  queueMessage = message => {
    this.queue.unshift(message);

    if (this.message === null) {
      this.popQueue();
    }
  };

  popQueue = () => {
    if (this.queue.length === 0) return;

    const message = this.queue.pop();
    this.message = message;

    this.awaitingMessageLayout = true;

    this.setState({
      message: {
        ...message,
        text: message.text || i18n.t('common.genericErrorMessage'),
      },
    });
  };

  hide = () => {
    Animated.timing(this.position, {
      duration: 100,
      toValue: -this.containerHeight,
    }).start();

    this.message = null;

    this.setState({
      message: null,
    });

    this.popQueue();
  };

  onMessageLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }) => {
    if (!this.awaitingMessageLayout) return;

    this.messageHeight = height;

    this.position.setValue(-this.containerHeight);

    Animated.timing(this.position, {
      duration: 200,
      toValue: 0,
    }).start();

    Animated.timing(this.type, {
      duration: 100,
      toValue: _.findIndex(Toast.types, { name: this.message.type }),
    }).start();

    const duration = this.message.duration || DURATION_DEFAULT;

    setTimeout(this.hide, duration);

    this.awaitingMessageLayout = false;
  };

  render() {
    const backgroundColor = this.type.interpolate({
      inputRange: _.range(0, Toast.types.length),
      outputRange: Toast.types.map(type => type.color),
    });

    return (
      <Animated.View
        style={[
          styles.container,
          {
            top: this.position,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.content,
            {
              backgroundColor,
            },
          ]}
          {...this.panResponder.panHandlers}
        >
          {this.state.message && (
            <View onLayout={this.onMessageLayout} style={styles.message}>
              <Image
                style={styles.icon}
                source={
                  _.find(Toast.types, { name: this.state.message.type }).icon
                }
              />
              <Text style={styles.text}>{this.state.message.text}</Text>
            </View>
          )}
        </Animated.View>
      </Animated.View>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages,
});

export default connect(mapStateToProps)(Toast);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    width: '100%',
  },
  content: {
    paddingTop: CONTAINER_PADDING_TOP,
    paddingBottom: CONTAINER_PADDING_BOTTOM,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  message: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 17,
  },
  icon: {
    marginRight: 14,
  },
});
