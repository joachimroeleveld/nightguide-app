import React from 'react';
import {} from 'react-native';
import { connect } from 'react-redux';

import { fetchVenue } from '../../state/venues/actions';
import Venue from '../../components/Venue';

class VenueScreen extends React.Component {
  static screenOptions = {
    errorMessages: {
      'venues.current.error': {},
    },
  };

  componentDidMount() {
    this.props.fetchVenue({
      venueId: this.props.navigation.getParam('venueId'),
    });
  }

  render() {
    if (!this.props.venue) {
      return null;
    }

    return <Venue {...this.props.venue || {}} />;
  }
}

const mapStateToProps = state => ({
  isFetching: state.venues.current.isFetching,
  venue: state.venues.current.data,
});

const mapDispatchToProps = {
  fetchVenue,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VenueScreen);
