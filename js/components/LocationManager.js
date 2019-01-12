import React from 'react';
import { connect } from 'react-redux';

import { setLocation } from '../state/location';

class LocationManager extends React.Component {
  watcher;

  get enabled() {
    return !(
      this.props.permissions === null || this.props.permissions === 'denied'
    );
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      (prevProps.permissions === null || prevProps.permissions === 'denied') &&
      this.props.permissions !== prevProps.permissions
    ) {
      this.init();
    }
  }

  init() {
    if (this.enabled) {
      this.watchPosition();
    }
  }

  componentWillUnmount() {
    if (this.enabled) {
      this.stopWatching();
    }
  }

  watchPosition = () => {
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
  permissions: state.permissions.location,
});

const mapDispatchToProps = {
  setLocation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationManager);
