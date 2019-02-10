import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import S from '../../config/styles';
import SearchBar from '../../components/SearchBar';
import { fetchVenues, queryVenues } from '../../state/venues/actions';
import { makeGetVenueList } from '../../state/venues/selectors';
import VenueList from '../../components/VenueList';

class ListScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: <Image source={require('../../img/tabbar/list.png')} />,
  };

  static screenOptions = {
    errorMessages: { 'venues.list.error': {} },
  };

  state = { searchIsFocused: false };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.lastLocationUpdate && this.props.lastLocationUpdate) {
      this.props.fetchVenues(0, 8);
    }
  }

  onQueryChange = text => {
    this.props.queryVenues(text);
  };

  onQueryChangeDebounced = _.debounce(this.onQueryChange);

  focusSearch = () =>
    this.setState({
      searchIsFocused: true,
    });

  blurSearch = () =>
    this.setState({
      searchIsFocused: false,
    });

  onItemPress = venueId => {
    this.props.navigation.navigate('Venue', { venueId });
  };

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          query={this.props.query}
          focused={this.state.searchIsFocused}
          onFocus={this.focusSearch}
          onCancelPress={this.blurSearch}
          onSubmit={this.blurSearch}
          style={styles.searchBar}
          onQueryChange={this.onQueryChangeDebounced}
          city={this.props.city}
        />
        <VenueList venues={this.props.venues} onItemPress={this.onItemPress} />
      </View>
    );
  }
}

const getVenueList = makeGetVenueList();

const mapStateToProps = state => ({
  city: state.venues.city,
  query: state.venues.list.query,
  venues: getVenueList(state),
  lastLocationUpdate: state.location.currentLocation.lastUpdate,
});

const FIELDS = ['name', 'images', 'categories', 'location'];

const mapDispatchToProps = {
  fetchVenues: (offset, limit) =>
    fetchVenues({
      offset,
      limit,
      fields: FIELDS,
    }),
  queryVenues: (text, offset, limit) =>
    queryVenues({
      text,
      offset,
      limit,
      fields: FIELDS,
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
    paddingBottom: 20,
  },
  searchBar: {
    marginHorizontal: S.dimensions.screenOffset,
  },
});
