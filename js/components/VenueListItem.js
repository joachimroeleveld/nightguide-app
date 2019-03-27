import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import _ from 'lodash';
import { connect } from 'react-redux';

import S from '../config/styles';
import Text from './Text';
import ProgressiveImage from './ProgressiveImage';
import Distance from './Distance';
import __ from '../services/i18n';
import { checkIsOpenFromSchedule } from './Venue/util';
import Image from './Image';

class VenueListItem extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    onPress: PropTypes.func,
    imageUrl: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    coordinates: PropTypes.object.isRequired,
    timeSchedule: PropTypes.object,
  };

  state = {
    layoutWidth: null,
  };

  get category() {
    return __(`venue.categories.${_.camelCase(this.props.categories[0])}`);
  }

  get isOpen() {
    return (
      this.props.timeSchedule &&
      checkIsOpenFromSchedule(this.props.timeSchedule.open)
    );
  }

  onLayout = ({
    nativeEvent: {
      layout: { width },
    },
  }) => {
    this.setState({ layoutWidth: Math.round(width) });
  };

  render() {
    return (
      <TouchableScale
        activeScale={S.dimensions.touchableScale}
        onPress={this.props.onPress}
        onLayout={this.onLayout}
        style={[styles.container, this.props.style]}
      >
        {!!this.state.layoutWidth && (
          <React.Fragment>
            <ProgressiveImage
              size={this.state.layoutWidth}
              style={[
                {
                  width: this.state.layoutWidth,
                },
                styles.thumbnail,
              ]}
              url={this.props.imageUrl}
            />
            <View style={styles.smallCapsContainer}>
              <Text style={styles.smallCaps}>
                {this.category.toUpperCase()}
              </Text>
              {this.props.hasLocation && (
                <React.Fragment>
                  <Text style={styles.smallCaps}>{' · '}</Text>
                  <Distance
                    caps={true}
                    style={styles.smallCaps}
                    coordinates={this.props.coordinates}
                  />
                </React.Fragment>
              )}
              {this.isOpen && (
                <Image
                  style={styles.openIndicator}
                  source={require('../img/open_indicator.png')}
                />
              )}
            </View>
            <Text style={styles.name}>{this.props.name}</Text>
          </React.Fragment>
        )}
      </TouchableScale>
    );
  }
}

const mapStateToProps = state => ({
  hasLocation: !!state.location.currentLocation.latitude,
});

export default connect(mapStateToProps)(VenueListItem);

const styles = StyleSheet.create({
  container: {},
  smallCapsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 4,
  },
  smallCaps: {
    ...S.text.smallCaps,
  },
  name: {
    fontWeight: '700',
    lineHeight: 17,
  },
  openIndicator: {
    marginLeft: 7,
  },
  thumbnail: {
    height: S.dimensions.venueListItemHeight,
  },
});
