import React from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import S from '../../config/styles';
import SearchBar from '../../components/SearchBar';
import {
  fetchVenues,
  queryVenues,
  filterVenues,
} from '../../state/venues/actions';
import { getVenueCount, makeGetVenueList } from '../../state/venues/selectors';
import VenueList from '../../components/venues/VenueList';
import { getHasPermission } from '../../state/permissions';
import FilterBar from './components/FilterBar';

const FETCH_FIELDS = [
  'name',
  'images',
  'categories',
  'location',
  'timeSchedule',
];
const ITEM_HEIGHT = 174; // Average height of list item
const NUM_COLUMNS = 2;

class ListScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: <Image source={require('../../img/tabbar/list.png')} />,
  };

  static screenOptions = {
    errorMessages: { 'venues.list.error': {} },
  };

  momentumScrolling = false;

  get reachedEnd() {
    return this.props.venueCount === this.props.totalVenueCount;
  }

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

  get fetchParams() {
    const params = {
      offset: this.state.page * this.pageSize,
      limit: this.pageSize,
      filter: this.state.filter,
      fields: FETCH_FIELDS,
    };
    if (this.state.query) {
      params.query = this.state.query;
    }
    return params;
  }

  state = {
    searchIsFocused: false,
    searchBarHeight: null,
    containerHeight: null,
    page: null,
    scrollY: new Animated.Value(0),
    filter: {},
    query: null,
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
      (this.props.isLocationEnabled && !this.props.lastLocationUpdate) ||
      !this.state.searchBarHeight ||
      !this.state.containerHeight ||
      this.props.isFetching ||
      this.reachedEnd
    ) {
      return;
    }

    let page;
    if (this.state.page === null || reset) {
      page = 0;
    } else {
      page = this.state.page + 1;
    }

    this.setState({ page }, () => {
      this.props.fetchVenues(this.fetchParams);
    });
  };

  onQueryChange = text => {
    if (text !== this.state.query) {
      this.setState({ page: 0 });
    }
    this.setState({ query: text }, () => {
      this.props.queryVenues(this.fetchParams);
    });
  };

  applyFilter = filter => {
    this.setState({ page: 0, filter }, () => {
      this.props.filterVenues(this.fetchParams);
    });
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

  onEndReached = () => {
    if (this.momentumScrolling) {
      this.fetchVenues();
      this.momentumScrolling = false;
    }
  };

  onRefresh = () => {
    if (this.props.fetchError) {
      this.fetchVenues(true);
    }
  };

  onFilterPress = () => {
    this.props.navigation.navigate('VenueFilter', {
      filterVenues: this.applyFilter,
    });
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
        <View style={styles.listContainer}>
          <FilterBar
            style={styles.filterBar}
            scrollPos={this.state.scrollY}
            onFilterPress={this.onFilterPress}
            filterVenues={this.applyFilter}
          />
          <VenueList
            venues={this.props.venues}
            onItemPress={this.onItemPress}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
            numColumns={NUM_COLUMNS}
            onMomentumScrollBegin={() => {
              this.momentumScrolling = true;
            }}
            style={styles.list}
            isFetching={this.props.isFetching}
            refreshHandler={this.onRefresh}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
            refreshControlProps={{ progressViewOffset: 25 }}
            ListHeaderComponent={<View style={styles.listHeader} />}
            ListFooterComponent={<View style={styles.listFooter} />}
          />
        </View>
      </View>
    );
  }
}

const getVenueList = makeGetVenueList();

const mapStateToProps = state => ({
  city: state.venues.city,
  query: state.venues.list.query,
  isFetching: state.venues.list.isFetching,
  venueCount: getVenueCount(state),
  totalVenueCount: state.venues.list.totalCount,
  venues: getVenueList(state),
  isLocationEnabled: getHasPermission(state, 'location'),
  lastLocationUpdate: state.location.currentLocation.lastUpdate,
  fetchError: state.venues.list.error,
});

const mapDispatchToProps = {
  fetchVenues,
  queryVenues,
  filterVenues,
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
    backgroundColor: S.colors.defaultScreenColor,
    paddingBottom: 8,
    zIndex: 6,
  },
  filterButtons: {
    flexDirection: 'row',
    marginHorizontal: S.dimensions.screenOffset,
  },
  list: {
    zIndex: 0,
  },
  listHeader: {
    height: 40,
    width: '100%',
  },
  listFooter: {
    height: S.dimensions.listItemMargin,
    width: '100%',
  },
  listContainer: {
    flex: 1,
  },
  filterBar: {
    zIndex: 5,
    position: 'absolute',
    width: '100%',
    paddingHorizontal: S.dimensions.screenOffset,
  },
});
