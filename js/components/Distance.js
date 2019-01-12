import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import geolib from 'geolib';
import _ from 'lodash';

import Text from './Text';

class Distance extends React.Component {
  static propTypes = {
    coordinates: PropTypes.shape({
      longitude: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired,
    }).isRequired,
    caps: PropTypes.bool,
  };

  static defaultProps = {
    caps: false,
  };

  get distance() {
    return this.calculateDistance(this.props.currentLocation);
  }

  get distanceText() {
    let val;
    if (this.distance < 1000) {
      // Display meters without decimals
      val = `${Math.round(this.distance)}m`;
    } else {
      if (this.distance < 10000) {
        // Show kms with 2 decimals
        val = Math.round(((this.distance + 0.00001) * 100) / 100);
      } else {
        // Show kms without decimals
        val = Math.round(this.distance / 1000);
      }
      val += 'km';
    }
    if (this.props.caps) {
      val = val.toUpperCase();
    }
    return val;
  }

  calculateDistance = _.memoize(({ latitude, longitude, accuracy }) =>
    geolib.getDistanceSimple(
      {
        latitude,
        longitude,
      },
      {
        latitude: this.props.coordinates.latitude,
        longitude: this.props.coordinates.longitude,
      },
      accuracy
    )
  );

  render() {
    return <Text style={this.props.style}>{this.distanceText}</Text>;
  }
}

const mapStateToProps = state => ({
  currentLocation: state.location.currentLocation,
});

export default connect(mapStateToProps)(Distance);
