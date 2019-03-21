import React from 'react';
import { connect } from 'react-redux';

import { setLocation } from '../state/location';
import { getHasPermission } from '../state/permissions';

class LocationManager extends React.PureComponent {
  componentDidMount() {
    if (this.props.enabled) {
      this.watchPosition();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.enabled !== prevProps.enabled) {
      if (this.props.enabled) {
        this.watchPosition();
      } else {
        this.stopWatching();
      }
    }
  }

  watchPosition = () => {
    // Request location based on network to get a response asap
    navigator.geolocation.getCurrentPosition(this.setLocation, null, {
      enableHighAccuracy: false,
    });
    navigator.geolocation.watchPosition(this.setLocation, null, {
      enableHighAccuracy: true,
    });
  };

  stopWatching = () => {
    navigator.geolocation.clearWatch(this.watcher);
  };

  setLocation = location => {
    const {
      coords: { latitude, longitude, accuracy },
    } = location;
    this.props.setLocation({
      latitude,
      longitude,
      accuracy,
    });
  };

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  enabled: getHasPermission(state, 'location'),
});

const mapDispatchToProps = {
  setLocation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationManager);
