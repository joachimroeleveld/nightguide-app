import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { fetchVenue, resetVenue } from '../../state/venues/actions';
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

  componentWillUnmount() {
    this.props.resetVenue();
  }

  render() {
    if (!this.props.venue) {
      return null;
    }

    return (
      <ScrollView style={{ flex: 1 }}>
        <Venue {...this.props.venue || {}} />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.venues.current.isFetching,
  venue: state.venues.current.data,
});

const mapDispatchToProps = {
  resetVenue,
  fetchVenue,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VenueScreen);
