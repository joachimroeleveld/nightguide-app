import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
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

  renderListItem = ({ item }) => {
    const style = this.props.horizontal
      ? styles.itemHorizontal
      : styles.itemVertical;
    return (
      <VenueListItem
        style={style}
        name={item.name}
        categories={item.categories}
        onPress={this.getOnItemPress(item.id)}
        imageUrl={item.images[0].url}
        coordinates={item.location.coordinates}
      />
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
        style={style}
      />
    );
  }
}

export default VenueList;

const styles = StyleSheet.create({
  containerVertical: {
    paddingHorizontal: S.dimensions.screenOffset / 2,
    paddingVertical: 5,
  },
  itemVertical: {
    marginHorizontal: S.dimensions.screenOffset / 2,
    marginVertical: 10,
  },
});
