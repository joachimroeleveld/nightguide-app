import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';

import ProgressiveImage from './ProgressiveImage';

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
  };

  state = {
    activeIndex: 0,
  };

  getImageSize = image => {
    return Math.min(image.width, image.height, this.props.width);
  };

  onIndexChange = index => {
    this.setState({ activeIndex: index });
  };

  render() {
    return (
      <View style={[styles.container, { height: this.props.height }]}>
        <Swiper
          loop={false}
          height={this.props.height}
          style={styles.swiper}
          showsPagination={false}
          onIndexChanged={this.onIndexChange}
        >
          {this.props.images.map((image, index) => (
            <ProgressiveImage
              key={index}
              style={[styles.image, { height: this.props.height }]}
              url={image.url}
              size={this.getImageSize(image)}
            />
          ))}
        </Swiper>
        <LinearGradient
          style={styles.topGradient}
          colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}
        />
        <LinearGradient
          style={styles.bottomGradient}
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
        />
        {this.props.images.length && (
          <View style={styles.pager}>
            <View style={styles.dots}>
              {this.props.images.map((image, index) => (
                <View
                  style={[
                    styles.dot,
                    index === this.state.activeIndex && styles.dotActive,
                  ]}
                  key={index}
                />
              ))}
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default Carousel;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
  },
  swiper: {
    zIndex: 0,
  },
  slide: {
    flex: 1,
  },
  image: {},
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
  pager: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 2,
    paddingVertical: 8,
  },
  dots: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  dot: {
    marginHorizontal: 3,
    width: 6,
    height: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  dotActive: {
    backgroundColor: '#fff',
  },
});
