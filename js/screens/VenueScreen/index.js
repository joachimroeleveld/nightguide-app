import React from 'react';
import { Dimensions, Animated } from 'react-native';
import { connect } from 'react-redux';

import { fetchVenue, resetVenue } from '../../state/venues/actions';
import Venue from '../../components/Venue';
import Header from '../../components/Header';
import HeaderBackButton from '../../components/HeaderBackButton';
import ScreenLoader from '../../components/ScreenLoader';
import Modal from '../../components/Modal';
import __ from '../../services/i18n';

const CAROUSEL_HEIGHT = Math.min(Dimensions.get('window').height * 0.4, 800);

class VenueScreen extends React.Component {
  static screenOptions = {
    errorMessages: {
      'venues.current.error': {},
    },
  };

  state = {
    scrollY: new Animated.Value(0),
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
      return <ScreenLoader />;
    }

    return (
      <React.Fragment>
        <Header
          absolute={true}
          backgroundAnimatedValue={this.state.scrollY}
          backgroundAnimatedValueRange={CAROUSEL_HEIGHT}
        >
          <HeaderBackButton />
        </Header>
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={100}
        >
          <Venue {...this.props.venue || {}} carouselHeight={CAROUSEL_HEIGHT} />
        </Animated.ScrollView>
        <Modal show={true} title={__('venueScreen.timeSchedule')}>
          <React.Fragment />
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
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
