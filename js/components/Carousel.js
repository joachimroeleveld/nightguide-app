import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RNCarousel, { Pagination } from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';

import ProgressiveImage from './ProgressiveImage';
const AnimatedProgressiveImage = Animated.createAnimatedComponent(
  ProgressiveImage
);

class Carousel extends React.PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    scollPosY: PropTypes.instanceOf(Animated.Value),
  };

  state = {
    activeSlide: 0,
  };

  renderCarouselItem = ({ item: image, index }) => {
    const translateY = this.props.scrollPosY.interpolate({
      inputRange: [-this.props.height, 0, this.props.height],
      outputRange: [0, 0, this.props.height / 2],
    });
    let priority;
    switch (index) {
      case 0:
        priority = FastImage.priority.high;
        break;
      case 1:
        priority = FastImage.priority.normal;
        break;
      case 2:
        priority = FastImage.priority.low;
        break;
    }
    return (
      <AnimatedProgressiveImage
        key={index}
        style={{ transform: [{ translateY }] }}
        width={Math.min(this.props.width, image.width)}
        height={this.props.height}
        url={image.url}
        priority={priority}
      />
    );
  };

  onSnapToItem = index => {
    this.setState({ activeSlide: index });
  };

  render() {
    return (
      <View style={[styles.container, { height: this.props.height }]}>
        <RNCarousel
          renderItem={this.renderCarouselItem}
          data={this.props.images}
          layoutCardOffset={0}
          itemWidth={this.props.width}
          itemHeight={this.props.height}
          sliderWidth={this.props.width}
          sliderHeight={this.props.height}
          loop={true}
          inactiveSlideScale={1}
          onSnapToItem={this.onSnapToItem}
          momentum={this.props.images.length !== 1}
          decelerationRate={this.props.images.length === 1 ? 'fast' : 0.9}
        />
        <LinearGradient
          style={styles.bottomGradient}
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
        />
        <Pagination
          dotsLength={this.props.images.length}
          activeDotIndex={this.state.activeSlide}
          containerStyle={styles.pagination}
          dotContainerStyle={styles.dotContainer}
          dotStyle={styles.dot}
          inactiveDotStyle={styles.dotInactive}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.8}
        />
      </View>
    );
  }
}

export default Carousel;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  swiper: {
    zIndex: 0,
  },
  slide: {
    flex: 1,
  },
  image: {},
  pagination: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1,
    paddingVertical: 10,
  },
  dot: {
    width: 6,
    height: 6,
    margin: 0,
    borderRadius: 3,
    marginHorizontal: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  dotContainer: {
    marginHorizontal: 3,
  },
  topGradient: {
    height: 90,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },
  bottomGradient: {
    height: 40,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
  },
});
