import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import _ from 'lodash';

import S from '../config/styles';
import Text from './Text';
import ProgressiveImage from './ProgressiveImage';
import Distance from './Distance';
import __ from '../services/i18n';

class VenueListItem extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    onPress: PropTypes.func,
    imageUrl: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    coordinates: PropTypes.object.isRequired,
  };

  state = {
    layoutWidth: null,
  };

  get category() {
    return __(`venue.categories.${_.camelCase(this.props.categories[0])}`);
  }

  onLayout = ({
    nativeEvent: {
      layout: { width },
    },
  }) => {
    this.setState({ layoutWidth: Math.round(width) });
  };

  render() {
    return (
      <TouchableScale
        activeScale={0.98}
        onPress={this.props.onPress}
        onLayout={this.onLayout}
        style={[styles.container, this.props.style]}
      >
        {!!this.state.layoutWidth && (
          <React.Fragment>
            <ProgressiveImage
              size={this.state.layoutWidth}
              style={[
                {
                  width: this.state.layoutWidth,
                },
                styles.thumbnail,
              ]}
              url={this.props.imageUrl}
            />
            <View style={styles.smallCapsContainer}>
              <Text style={styles.smallCaps}>
                {this.category.toUpperCase() + ' · '}
              </Text>
              <Distance
                caps={true}
                style={styles.smallCaps}
                coordinates={this.props.coordinates}
              />
            </View>
            <Text style={styles.name}>{this.props.name}</Text>
          </React.Fragment>
        )}
      </TouchableScale>
    );
  }
}

export default VenueListItem;

const styles = StyleSheet.create({
  container: {},
  smallCapsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 4,
  },
  smallCaps: {
    fontSize: S.text.smallCapsFontSize,
    fontWeight: '700',
    color: S.colors.textSmallCaps,
  },
  name: {
    fontWeight: '700',
    lineHeight: 17,
  },
  thumbnail: {
    height: S.dimensions.venueListItemHeight,
  },
});
