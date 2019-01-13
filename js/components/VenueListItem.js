import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import S from '../config/styles';
import Text from './Text';
import ProgressiveImage from './ProgressiveImage';
import Distance from './Distance';

class VenueListItem extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    imageUrl: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    coordinates: PropTypes.object.isRequired,
  };

  state = {
    category: '',
    layoutWidth: null,
  };

  onLayout = ({
    nativeEvent: {
      layout: { width },
    },
  }) => {
    this.setState({ layoutWidth: Math.floor(width) });
  };

  render() {
    return (
      <View
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
                {this.props.category.toUpperCase() + ' · '}
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
      </View>
    );
  }
}

export default VenueListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  smallCapsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 1,
  },
  smallCaps: {
    fontSize: S.text.smallCapsFontSize,
    fontWeight: '700',
    color: '#CACACA',
  },
  name: {
    fontWeight: '700',
    fontSize: 14,
  },
  thumbnail: {
    height: 130,
  },
});
