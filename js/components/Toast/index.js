import React from 'react';
import { StyleSheet, Animated, PanResponder, Image, View } from 'react-native';
import { connect } from 'react-redux';
import { range, map, findIndex, find } from 'rambda';

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

    this._lastMessageIndex = -1;
    this._queue = [];
    this._messageHeight = 0;
    this._panResponder = null;
    this._position = new Animated.Value(-100);
    this._type = new Animated.Value(0);

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dy < 0) {
          this._position.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (Math.abs(gestureState.dy) > this._containerHeight / 3) {
          this._hide();
        } else {
          Animated.timing(this._position, {
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

  componentDidUpdate(nextProps) {
    if (nextProps.messages.length - 1 !== this._lastMessageIndex) {
      const newMessageIndex = this._lastMessageIndex + 1;

      this._queueMessage(nextProps.messages[newMessageIndex]);

      this._lastMessageIndex = newMessageIndex;
    }
  }

  get _containerHeight() {
    return (
      CONTAINER_PADDING_TOP + this._messageHeight + CONTAINER_PADDING_BOTTOM
    );
  }

  _queueMessage = message => {
    this._queue.unshift(message);

    if (this._message === null) {
      this._popQueue();
    }
  };

  _popQueue = () => {
    if (this._queue.length === 0) return;

    const message = this._queue.pop();
    this._message = message;

    this._awaitingMessageLayout = true;

    this.setState({
      message: {
        ...message,
        text: message.text || i18n.t('common.genericErrorMessage'),
      },
    });
  };

  _hide = () => {
    Animated.timing(this._position, {
      duration: 100,
      toValue: -this._containerHeight,
    }).start();

    this._message = null;

    this.setState({
      message: null,
    });

    this._popQueue();
  };

  _onMessageLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }) => {
    if (!this._awaitingMessageLayout) return;

    this._messageHeight = height;

    this._position.setValue(-this._containerHeight);

    Animated.timing(this._position, {
      duration: 200,
      toValue: 0,
    }).start();

    Animated.timing(this._type, {
      duration: 100,
      toValue: findIndex(Toast.types, { name: this._message.type }),
    }).start();

    const duration = this._message.duration || DURATION_DEFAULT;

    setTimeout(this._hide, duration);

    this._awaitingMessageLayout = false;
  };

  render() {
    const backgroundColor = this._type.interpolate({
      inputRange: range(0, Toast.types.length),
      outputRange: Toast.types.map(type => type.color),
    });

    return (
      <Animated.View
        style={[
          styles.container,
          {
            top: this._position,
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
          {...this._panResponder.panHandlers}
        >
          {this.state.message && (
            <View onLayout={this._onMessageLayout} style={styles.message}>
              <Image
                style={styles.icon}
                source={
                  find(Toast.types, { name: this.state.message.type }).icon
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
