import React from 'react';
import { FlatList, StyleSheet, Dimensions, View } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import S from '../config/styles';
import VenueListItem from './VenueListItem';

class VenueList extends React.PureComponent {
  static propTypes = {
    venues: PropTypes.array.isRequired,
    numColumns: PropTypes.number,
    horizontal: PropTypes.bool,
    onItemPress: PropTypes.func,
  };

  static defaultProps = {
    numColumns: 2,
    horizontal: false,
  };

  renderListItem = ({ item, index }) => {
    const style = this.props.horizontal
      ? styles.itemHorizontal
      : styles.itemVertical;

    let itemWidth;
    if (!this.props.horizontal) {
      itemWidth =
        (Dimensions.get('window').width -
          S.dimensions.screenOffset * 2 -
          S.dimensions.listItemMargin * (this.props.numColumns - 1)) /
        this.props.numColumns;
    }

    const Separator = () => <View style={styles.separator} />;

    return (
      <View style={styles.itemContainer}>
        <VenueListItem
          style={[style, { width: itemWidth }]}
          name={item.name}
          categories={item.categories}
          onPress={this.getOnItemPress(item.id)}
          imageUrl={item.images[0].url}
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
      <View style={style}>
        <FlatList
          keyExtractor={this.keyExtractor}
          renderItem={this.renderListItem}
          data={this.props.venues}
          numColumns={this.props.numColumns}
        />
      </View>
    );
  }
}

export default VenueList;

const styles = StyleSheet.create({
  containerVertical: {
    marginHorizontal: S.dimensions.screenOffset,
    paddingVertical: S.dimensions.listItemMargin / 2,
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
});
