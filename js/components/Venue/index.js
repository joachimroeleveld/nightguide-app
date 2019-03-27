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
import OpeningHours from './components/OpeningHours';
import Modal from '../Modal';
import Timeline from './components/Timeline';
import Tiles from './components/Tiles';

const IMAGE_SORT_ORDER = [
  'front_venue',
  'front_stage',
  'from_bar',
  'from_stage',
  'atmosphere',
  'front_bar',
];

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
    }).isRequired,
    facebook: PropTypes.shape({
      id: PropTypes.string,
    }),
    twitterHandle: PropTypes.string,
    musicTypes: PropTypes.arrayOf(PropTypes.string),
    visitorTypes: PropTypes.arrayOf(PropTypes.string),
    timeSchedule: PropTypes.object,
    carouselHeight: PropTypes.number.isRequired,
  };

  state = {
    belowFoldOpacity: new Animated.Value(0),
    carouselWidth: Dimensions.get('window').width,
    showTimeline: false,
  };

  get sortedImages() {
    return this.props.images.sort((a, b) => {
      const indexA = IMAGE_SORT_ORDER.indexOf(a);
      const indexB = IMAGE_SORT_ORDER.indexOf(b);
      if (indexA === -1) {
        return 1;
      }
      return indexA < indexB ? -1 : 1;
    });
  }

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

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Carousel
          width={this.state.carouselWidth}
          height={this.props.carouselHeight}
          images={this.sortedImages}
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
              <OpeningHours
                style={styles.openingHours}
                schedule={this.props.timeSchedule.open}
                city={this.props.location.city}
                toggleModalCallback={this.toggleShowTimeline}
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
          <Section>
            <Tiles
              facilities={this.props.facilities}
              dresscode={this.props.dresscode}
              fees={this.props.fees}
              paymentMethods={this.props.paymentMethods}
              capacity={this.props.capacity}
              doorPolicy={this.props.doorPolicy}
            />
          </Section>
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
});
