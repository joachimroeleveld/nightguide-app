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
import { showLocation } from 'react-native-map-link';

import { VENUE_IMAGE_ORDER } from './constants';
import S from '../../../config/styles';
import Carousel from '../../Carousel';
import Text from '../../Text';
import __, { _o } from '../../../services/i18n';
import Distance from '../../Distance';
import VenueLinks from './components/Links';
import VenueDescription from './components/Description';
import MusicTypes from './components/MusicTypes';
import Section from '../../Section';
import VisitorTypes from './components/VisitorTypes';
import OpeningHours from './components/OpeningHours';
import Modal from '../../Modal';
import Timeline from './components/Timeline';
import Tiles from './components/Tiles';
import BigButton from '../../buttons/BigButton';
import VenuePriceClass from './components/PriceClass';

class Venue extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    images: PropTypes.array,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      address1: PropTypes.string.isRequired,
      address2: PropTypes.string,
      googlePlaceId: PropTypes.string,
    }).isRequired,
    facebook: PropTypes.shape({
      id: PropTypes.string,
    }),
    twitterHandle: PropTypes.string,
    musicTypes: PropTypes.arrayOf(PropTypes.string),
    visitorTypes: PropTypes.arrayOf(PropTypes.string),
    timeSchedule: PropTypes.object,
    carouselHeight: PropTypes.number.isRequired,
    currency: PropTypes.string,
    scrollPosY: PropTypes.instanceOf(Animated.Value),
  };

  state = {
    belowFoldOpacity: new Animated.Value(0),
    carouselWidth: Math.round(Dimensions.get('window').width),
    showTimeline: false,
    showNavigate: false,
    images: this.props.images.sort((a, b) => {
      const indexA = VENUE_IMAGE_ORDER.indexOf(a.perspective);
      const indexB = VENUE_IMAGE_ORDER.indexOf(b.perspective);
      if (indexA === -1) {
        return -1;
      }
      return indexA < indexB ? -1 : 1;
    }),
  };

  get address() {
    let address = this.props.location.address1;
    if (this.props.location.address2) {
      address += ' ' + this.props.location.address2;
    }
    return address;
  }

  toggleShowTimeline = () => {
    this.setState({
      showTimeline: !this.state.showTimeline,
    });
  };

  showNavigationOptions = () => {
    showLocation({
      latitude: this.props.location.coordinates.latitude,
      longitude: this.props.location.coordinates.longitude,
      title: this.props.name, // optional
      dialogTitle: __('venueScreen.navigationOptions'),
      dialogMessage: __('venueScreen.whatNavigationApp'),
      cancelText: __('cancel'),
      googlePlaceId: this.props.location.googlePlaceId,
    });
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Carousel
          width={this.state.carouselWidth}
          height={this.props.carouselHeight}
          images={this.state.images}
          scrollPosY={this.props.scrollPosY}
        />
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
              {!!this.props.timeSchedule.open && (
                <OpeningHours
                  style={styles.openingHours}
                  schedule={this.props.timeSchedule.open}
                  city={this.props.location.city}
                  toggleModalCallback={this.toggleShowTimeline}
                />
              )}
              {!!this.props.priceClass && (
                <VenuePriceClass
                  style={styles.priceClass}
                  priceClass={this.props.priceClass}
                />
              )}
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
          <Tiles
            facilities={this.props.facilities}
            dresscode={this.props.dresscode}
            fees={this.props.fees}
            paymentMethods={this.props.paymentMethods}
            capacityRange={this.props.capacityRange}
            doorPolicy={this.props.doorPolicy}
            entranceFeeRange={this.props.entranceFeeRange}
            currency={this.props.currency}
          />
          <View style={styles.mapsContainer}>
            <BigButton
              style={styles.navigateButton}
              icon={require('../../../img/maps.png')}
              title={__('venueScreen.navigateHere')}
              onPress={this.showNavigationOptions}
            />
          </View>
        </SafeAreaView>
        <Modal
          visible={this.state.showTimeline}
          title={__('venueScreen.timeSchedule')}
          onRequestClose={this.toggleShowTimeline}
        >
          <Timeline schedule={this.props.timeSchedule} />
        </Modal>
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
    ...S.text.h1,
    lineHeight: 26,
  },
  header: {
    paddingTop: 24,
  },
  content: {
    marginHorizontal: S.dimensions.screenOffset,
  },
  categories: {
    ...S.text.smallCaps,
    marginBottom: 10,
  },
  address: {
    color: S.colors.textSecondary,
  },
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: -S.dimensions.screenOffset,
    paddingHorizontal: S.dimensions.screenOffset,
    borderColor: S.colors.separatorColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 9,
    marginTop: 8,
  },
  distance: {},
  openingHours: {
    marginLeft: 14,
  },
  priceClass: {
    marginLeft: 14,
  },
  mapsContainer: {
    alignItems: 'center',
  },
  navigateButton: {
    ...S.buttons.greenButton,
    fontSize: 13,
    minWidth: '70%',
    marginTop: 30,
    marginBottom: 20,
  },
});
