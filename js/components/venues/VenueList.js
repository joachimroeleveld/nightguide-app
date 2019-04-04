import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Animated } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import S from '../../config/styles';
import { VENUE_IMAGE_ORDER } from './Venue/constants';
import VenueListItem from './VenueListItem';
import RefreshControl from '../RefreshControl';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class VenueList extends React.PureComponent {
  static propTypes = {
    venues: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    refreshHandler: PropTypes.func.isRequired,
    numColumns: PropTypes.number,
    horizontal: PropTypes.bool,
    onItemPress: PropTypes.func,
  };

  static defaultProps = {
    numColumns: 2,
    horizontal: false,
  };

  getImageUrl = images => {
    const sortedImages = images.sort((a, b) => {
      const indexA = VENUE_IMAGE_ORDER.indexOf(a.perspective);
      const indexB = VENUE_IMAGE_ORDER.indexOf(b.perspective);
      if (indexA === -1) {
        return -1;
      }
      return indexA < indexB ? -1 : 1;
    });
    return images.length ? sortedImages[0].url : null;
  };

  renderListItem = ({ item, index }) => {
    const style = [
      this.props.horizontal ? styles.itemHorizontal : styles.itemVertical,
    ];

    let itemWidth;
    if (!this.props.horizontal) {
      itemWidth =
        (Dimensions.get('window').width -
          S.dimensions.screenOffset * 2 -
          S.dimensions.listItemMargin * (this.props.numColumns - 1)) /
        this.props.numColumns;

      if (index < this.props.numColumns) {
        style.push(styles.topItem);
      } else if (index >= this.props.venues.length - this.props.numColumns) {
        style.push(styles.bottomItem);
      }
    }

    const Separator = () => <View style={styles.separator} />;

    return (
      <View style={styles.itemContainer}>
        <VenueListItem
          style={[style, { width: itemWidth }]}
          name={item.name}
          categories={item.categories}
          timeSchedule={item.timeSchedule}
          onPress={this.getOnItemPress(item.id)}
          imageUrl={this.getImageUrl(item.images)}
          coordinates={item.location.coordinates}
        />
        {!this.props.horizontal && index % this.props.numColumns === 0 && (
          <Separator />
        )}
      </View>
    );
  };

  getOnItemPress = _.memoize(venueId => () => this.props.onItemPress(venueId));

  keyExtractor = venue => venue.id;

  render() {
    const style = this.props.horizontal
      ? styles.containerHorizontal
      : styles.containerVertical;
    return (
      <AnimatedFlatList
        keyExtractor={this.keyExtractor}
        renderItem={this.renderListItem}
        data={this.props.venues}
        numColumns={this.props.numColumns}
        contentContainerStyle={[style, this.props.style]}
        onScroll={this.props.onScroll}
        refreshControl={
          <RefreshControl
            refreshing={this.props.isFetching}
            onRefresh={this.props.refreshHandler}
          />
        }
        {...this.props}
      />
    );
  }
}

export default VenueList;

const styles = StyleSheet.create({
  containerVertical: {
    marginHorizontal: S.dimensions.screenOffset,
  },
  itemVertical: {
    marginVertical: S.dimensions.listItemMargin / 2,
  },
  itemContainer: {
    flexDirection: 'row',
  },
  separator: {
    width: S.dimensions.listItemMargin,
    height: '100%',
  },
  topItem: {
    marginTop: 0,
  },
  bottomItem: {
    marginBottom: 0,
  },
});
