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

  state = { searchIsFocused: false };

  componentDidMount() {
    this.props.fetchVenues(0, 8);
  }

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
        />
        <VenueList venues={this.props.venues} onItemPress={this.onItemPress} />
      </View>
    );
  }
}

const getVenueList = makeGetVenueList();

const mapStateToProps = state => ({
  query: state.venues.query,
  venues: getVenueList(state),
});

const mapDispatchToProps = {
  fetchVenues: (offset, limit) =>
    fetchVenues({
      offset,
      limit,
      fields: ['name', 'images', 'categories', 'location'],
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
