import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import S from '../config/styles';
import Text from './Text';
import ProgressiveImage from './ProgressiveImage';

class VenueListItem extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    imageUrl: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    distance: PropTypes.number,
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
              style={{
                width: this.state.layoutWidth,
                height: this.state.layoutWidth,
              }}
              url={this.props.imageUrl}
            />
            <Text style={styles.category}>
              {this.props.category.toUpperCase()}
            </Text>
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
  category: {
    fontSize: S.text.smallCapsFontSize,
    fontWeight: '700',
    color: '#CACACA',
    marginTop: 8,
    marginBottom: 1,
  },
  name: {
    fontWeight: '700',
    fontSize: 14,
  },
});
