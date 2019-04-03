import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { NavigationEvents } from 'react-navigation';

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
import S from '../config/styles';

class ProgressiveImage extends React.PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    lazy: PropTypes.bool,
    priority: PropTypes.string,
  };

  static defaultProps = {
    priority: FastImage.priority.normal,
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

  getSource = () => {
    const { width, height } = this.props;
    const params = width >= height ? '-c' : '';
    return _.memoize((uri, size, priority) => ({
      uri: `${uri}=s${size}${params}`,
      priority,
    }))(this.props.url, Math.max(width, height), this.props.priority);
  };

  getThumbnailSource = () =>
    _.memoize((uri, priority) => ({
      uri: `${uri}=s10-c-fSoften=1,100,0`,
      priority,
    }))(this.props.url, this.props.priority);

  onScreenFocus = () => {
    this.setState({
      loaded: true,
    });
  };

  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { style, lazy, containerStyle, width, height } = this.props;

    if (lazy && !this.state.loaded) {
      return (
        <View style={[styles.container, style]}>
          <NavigationEvents onDidFocus={this.onScreenFocus} />
        </View>
      );
    }

    return (
      <View style={[{ width, height }, styles.container, containerStyle]}>
        <AnimatedFastImage
          source={this.getThumbnailSource()}
          style={[
            { width, height },
            style,
            styles.imageThumbnail,
            { opacity: this.thumbnailAnimated },
          ]}
          onLoad={this.handleThumbnailLoad}
        />
        <AnimatedFastImage
          source={this.getSource()}
          style={[
            { width, height },
            style,
            styles.image,
            { opacity: this.imageAnimated },
          ]}
          onLoad={this.onImageLoad}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    );
  }
}

export default ProgressiveImage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: S.colors.imagePlaceholderColor,
  },
  imageThumbnail: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  image: {
    zIndex: 1,
  },
});
