import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';
import _ from 'lodash';

import S from '../../config/styles';
import Carousel from '../Carousel';
import Text from '../Text';
import __, { _o } from '../../services/i18n';
import Distance from '../Distance';
import VenueLinks from './components/Links';
import VenueDescription from './components/Description';
import MusicTypes from './components/MusicTypes';
import Section from '../Section';
import VisitorTypes from './components/VisitorTypes';

const CAROUSEL_HEIGHT = Math.min(Dimensions.get('window').height * 0.4, 800);

class Venue extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    images: PropTypes.array,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    location: PropTypes.shape({
      address1: PropTypes.string,
      address2: PropTypes.string,
    }),
    facebook: PropTypes.shape({
      id: PropTypes.string,
    }),
    twitterHandle: PropTypes.string,
    musicTypes: PropTypes.arrayOf(PropTypes.string),
    visitorTypes: PropTypes.arrayOf(PropTypes.string),
  };

  state = {
    belowFoldOpacity: new Animated.Value(0),
    carouselHeight: CAROUSEL_HEIGHT,
    carouselWidth: Dimensions.get('window').width,
  };

  get address() {
    let address = this.props.location.address1;
    if (this.props.location.address2) {
      address += ' ' + this.props.location.address2;
    }
    return address;
  }

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
                .map(id => __(`venue.categories.${_.camelCase(id)}`))
                .map(category => category.toUpperCase())
                .join(' · ')}
            </Text>
            <Text style={styles.name}>{this.props.name}</Text>
            <Text style={styles.address}>{this.address}</Text>
            <VenueLinks
              facebook={this.props.facebook}
              instagram={this.props.instagram}
              website={this.props.website}
            />
            <View style={styles.infoBar}>
              <Distance
                style={styles.distance}
                coordinates={this.props.location.coordinates}
              />
            </View>
          </View>
          {_o(this.props.description) && (
            <VenueDescription text={_o(this.props.description)} />
          )}
          {!!this.props.musicTypes.length && (
            <Section title={__('venueScreen.music')}>
              <MusicTypes types={this.props.musicTypes} />
            </Section>
          )}
          {!!this.props.visitorTypes.length && (
            <Section title={__('venueScreen.typicalVisitors')}>
              <VisitorTypes types={this.props.visitorTypes} />
            </Section>
          )}
        </SafeAreaView>
      </View>
    );
  }
}

export default Venue;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 36,
  },
  name: {
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
  infoBar: {
    marginHorizontal: -S.dimensions.screenOffset,
    paddingHorizontal: S.dimensions.screenOffset,
    borderColor: S.colors.separatorColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 9,
    marginTop: 8,
  },
  distance: {
    fontSize: 14,
  },
});
