import React from 'react';
import { FlatList, StyleSheet, Dimensions, View } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import S from '../config/styles';
import VenueListItem from './VenueListItem';
import RefreshControl from '../components/RefreshControl';

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

  getImage = images => {
    const frontVenueImage = images.find(
      image => image.perspective === 'front_venue'
    );

    if (frontVenueImage) {
      return frontVenueImage.url;
    } else if (images.length) {
      return images[0].url;
    }
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
          imageUrl={this.getImage(item.images)}
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
      <FlatList
        keyExtractor={this.keyExtractor}
        renderItem={this.renderListItem}
        data={this.props.venues}
        numColumns={this.props.numColumns}
        contentContainerStyle={[style, this.props.style]}
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
