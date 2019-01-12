import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

import S from '../../config/styles';
import SearchBar from '../../components/SearchBar';
import { fetchVenues } from '../../state/venues/actions';
import { makeGetVenueList } from '../../state/venues/selectors';
import VenueList from '../../components/VenueList';

class ListScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: <Image source={require('../../img/tabbar/list.png')} />,
  };

  static screenOptions = {
    errorMessages: { 'venues.list.error': {} },
  };

  state = { showSearchCancel: false };

  componentDidMount() {
    this.props.fetchVenues(0, 8);
  }

  onSearchBarFocus = () => {
    this.props.navigation.navigate('Search', {
      query: 'Utrecht',
      toggleCancel: this.toggleCancel,
    });
  };

  toggleCancel = () =>
    this.setState({ showSearchCancel: !this.state.showSearchCancel });

  onItemPress = venue => {
    this.props.navigation.navigate('Venue', {
      venueId: venue.id,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          showCancel={this.state.showSearchCancel}
          onFocus={this.onSearchBarFocus}
          query={'Utrecht'}
          style={styles.searchBar}
        />
        <VenueList venues={this.props.venues} onItemPress={this.onItemPress} />
      </View>
    );
  }
}

const getVenueList = makeGetVenueList();

const mapStateToProps = state => ({
  venues: getVenueList(state),
});

const mapDispatchToProps = {
  fetchVenues: (offset, limit) =>
    fetchVenues({
      offset,
      limit,
      fields: ['name', 'images', 'category', 'location'],
    }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: S.dimensions.screenOffset,
  },
  searchBar: {
    marginHorizontal: S.dimensions.screenOffset,
  },
});
