import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { NavigationEvents } from 'react-navigation';

import S from '../config/styles';

class Image extends React.PureComponent {
  static propTypes = {
    lazy: PropTypes.bool,
  };

  static defaultProps = {
    lazy: false,
  };

  constructor(props) {
    super(props);

    if (this.props.lazy) {
      this.state = {
        loaded: false,
        imageOpacity: new Animated.Value(0),
      };
    }
  }

  show = () => {
    this.setState(
      {
        loaded: true,
      },
      () => {
        Animated.timing(this.state.imageOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    );
  };

  render() {
    const { lazy, style, ...imageProps } = this.props;
    if (lazy && !this.state.loaded) {
      return (
        <View style={[styles.placeholder, style]}>
          <NavigationEvents onDidFocus={this.show} />
        </View>
      );
    }
    return (
      <Animated.Image
        {...imageProps}
        style={[{ opacity: lazy ? this.state.imageOpacity : 1 }, style]}
      />
    );
  }
}

export default Image;

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: S.colors.tileBackgroundColor,
  },
});
