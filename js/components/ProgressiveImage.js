import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { NavigationEvents } from 'react-navigation';

import S from '../config/styles';

class ProgressiveImage extends React.PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    lazy: PropTypes.bool,
  };

  thumbnailAnimated = new Animated.Value(0);
  imageAnimated = new Animated.Value(0);

  constructor(props) {
    super(props);

    if (this.props.lazy) {
      this.state = {
        loaded: false,
      };
    }
  }

  getSource = () =>
    _.memoize((uri, size) => ({ uri: `${uri}=s${size}-c` }))(
      this.props.url,
      this.props.size
    );

  getThumbnailSource = () =>
    _.memoize(uri => ({ uri: `${uri}=s10-c` }))(this.props.url);

  onScreenFocus = () => {
    this.setState({
      loaded: true,
    });
  };

  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1,
    }).start();
  };

  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1,
    }).start();
  };

  render() {
    const { style, lazy } = this.props;

    if (lazy && !this.state.loaded) {
      return (
        <View style={[styles.container, style]}>
          <NavigationEvents onDidFocus={this.onScreenFocus} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Animated.Image
          source={this.getThumbnailSource()}
          style={[style, { opacity: this.thumbnailAnimated }]}
          onLoad={this.handleThumbnailLoad}
          blurRadius={1}
        />
        <Animated.Image
          source={this.getSource()}
          style={[style, styles.imageOverlay, { opacity: this.imageAnimated }]}
          onLoad={this.onImageLoad}
        />
      </View>
    );
  }
}

export default ProgressiveImage;

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: S.colors.imagePlaceholderColor,
  },
});
