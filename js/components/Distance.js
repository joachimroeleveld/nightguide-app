import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import geolib from 'geolib';
import _ from 'lodash';

import Text from './Text';

class Distance extends React.PureComponent {
  static propTypes = {
    coordinates: PropTypes.shape({
      longitude: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired,
    }).isRequired,
    caps: PropTypes.bool,
    fallbackText: PropTypes.string,
  };

  static defaultProps = {
    caps: false,
    fallbackText: '',
  };

  get enabled() {
    return this.props.currentLocation.longitude !== null;
  }

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
        val = Math.round(((this.distance / 1000 + 0.00001) * 100) / 100);
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
    geolib.getDistance(
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
    const value = this.enabled ? this.distanceText : this.props.fallbackText;
    return <Text style={this.props.style}>{value}</Text>;
  }
}

const mapStateToProps = state => ({
  currentLocation: state.location.currentLocation,
});

export default connect(mapStateToProps)(Distance);
