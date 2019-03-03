import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import S from '../../config/styles';
import SearchBar from '../../components/SearchBar';
import { fetchVenues, queryVenues } from '../../state/venues/actions';
import { makeGetVenueList } from '../../state/venues/selectors';
import VenueList from '../../components/VenueList';
import { getHasPermission } from '../../state/permissions';

const ITEM_HEIGHT = 174; // Average height of list item
const NUM_COLUMNS = 2;

class ListScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: <Image source={require('../../img/tabbar/list.png')} />,
  };

  static screenOptions = {
    errorMessages: { 'venues.list.error': {} },
  };

  get pageSize() {
    const pageHeight = this.state.containerHeight - this.state.searchBarHeight;
    const visibleSize = (pageHeight / ITEM_HEIGHT) * NUM_COLUMNS;
    let size = Math.round(visibleSize * 1.5);

    // Make sure number of items is dividable by number of columns
    const rest = size % NUM_COLUMNS;
    if (rest !== 0) {
      size += Math.round(rest / NUM_COLUMNS) * NUM_COLUMNS;
    }

    return size;
  }

  state = {
    searchIsFocused: false,
    searchBarHeight: null,
    containerHeight: null,
    page: null,
  };

  componentDidMount() {
    this.fetchVenues();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.lastLocationUpdate && this.props.lastLocationUpdate) {
      this.fetchVenues();
    }
  }

  fetchVenues = (reset = false) => {
    if (
      (!this.props.lastLocationUpdate && this.props.isLocationEnabled) ||
      !this.state.searchBarHeight ||
      !this.state.containerHeight ||
      this.props.isFetching ||
      this.props.reachedEnd
    ) {
      return;
    }

    let page;
    if (this.state.page === null || reset) {
      page = 0;
    } else {
      page = this.state.page + 1;
    }

    this.setState({ page });

    this.props.fetchVenues(page * this.pageSize, this.pageSize);
  };

  onQueryChange = text => {
    if (!this.props.query || !text) {
      this.setState({ page: 0 });
    }
    this.props.queryVenues(text, this.pageSize);
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

  onSearchBarLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }) =>
    this.setState({ searchBarHeight: height }, () => {
      this.fetchVenues();
    });

  onContainerLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }) =>
    this.setState(
      {
        containerHeight: height,
      },
      () => {
        this.fetchVenues();
      }
    );

  loadNextPage = () => this.fetchVenues();

  onRefresh = () => {
    if (this.props.fetchError) {
      this.fetchVenues(true);
    }
  };

  render() {
    return (
      <View style={styles.container} onLayout={this.onContainerLayout}>
        <SearchBar
          query={this.props.query}
          focused={this.state.searchIsFocused}
          onFocus={this.focusSearch}
          onCancelPress={this.blurSearch}
          onSubmit={this.blurSearch}
          style={styles.searchBar}
          onQueryChange={this.onQueryChangeDebounced}
          city={this.props.city}
          onLayout={this.onSearchBarLayout}
        />
        <VenueList
          venues={this.props.venues}
          onItemPress={this.onItemPress}
          onEndReached={this.loadNextPage}
          onEndReachedThreshold={0.5}
          numColumns={NUM_COLUMNS}
          style={styles.list}
          isFetching={this.props.isFetching}
          refreshHandler={this.onRefresh}
        />
      </View>
    );
  }
}

const getVenueList = makeGetVenueList();

const mapStateToProps = state => ({
  city: state.venues.city,
  query: state.venues.list.query,
  isFetching: state.venues.list.isFetching,
  reachedEnd: state.venues.list.reachedEnd,
  venues: getVenueList(state),
  isLocationEnabled: getHasPermission(state, 'location'),
  lastLocationUpdate: state.location.currentLocation.lastUpdate,
  fetchError: state.venues.list.error,
});

const FIELDS = ['name', 'images', 'categories', 'location'];

const mapDispatchToProps = {
  fetchVenues: (offset, limit) =>
    fetchVenues({
      offset,
      limit,
      fields: FIELDS,
    }),
  queryVenues: (text, limit) =>
    queryVenues({
      text,
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
  },
  searchBar: {
    marginTop: S.dimensions.screenOffset,
    marginHorizontal: S.dimensions.screenOffset,
    paddingBottom: 10,
  },
  list: {
    paddingTop: 5,
    paddingBottom: S.dimensions.screenOffset,
  },
});
