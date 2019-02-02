import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';

import S from '../config/styles';
import Carousel from './Carousel';
import Text from './Text';
import __ from '../services/i18n';

class Venue extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    images: PropTypes.array,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    location: PropTypes.shape({
      address1: PropTypes.string,
      address2: PropTypes.string,
    }),
  };

  get address() {
    let address = this.props.location.address1;
    if (this.props.location.address2) {
      address += ' ' + this.props.location.address2;
    }
    return address;
  }

  get facebookUrl() {
    if (this.props.facebook && this.props.facebook.id) {
      return `https://www.facebook.com/${this.props.facebook.id}/`;
    }
    return null;
  }

  state = {
    carouselHeight: Dimensions.get('window').height * 0.4,
    carouselWidth: Dimensions.get('window').width,
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.images && (
          <Carousel
            width={this.state.carouselWidth}
            height={this.state.carouselHeight}
            images={this.props.images}
          />
        )}
        <SafeAreaView style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.categories}>
              {this.props.categories
                .map(id => __(`venueCategories.${_.camelCase(id)}`))
                .map(category => category.toUpperCase())
                .join(' · ')}
            </Text>
            <Text style={styles.title}>{this.props.name}</Text>
            <Text style={styles.address}>{this.address}</Text>
            {this.facebookUrl &&
              <TouchableOpacity>
                <Image source={require('./img/fb-icon.png')} />
              </TouchableOpacity>
            }
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default Venue;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '700',
  },
  header: {
    paddingTop: 24,
  },
  content: {
    marginHorizontal: S.dimensions.screenOffset,
  },
  categories: {
    fontSize: S.text.smallCapsFontSize,
    color: S.colors.textSmallCaps,
    fontWeight: '700',
    marginBottom: 10,
  },
  address: {
    color: S.colors.textSecondary,
  },
});
