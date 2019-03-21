import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class ImageButton extends React.PureComponent {
  static propTypes = {
    image: PropTypes.any.isRequired,
    imageStyle: PropTypes.any,
    onPress: PropTypes.func.isRequired,
    disabledImage: PropTypes.any,
    disabled: PropTypes.bool,
  };

  render() {
    return (
      <TouchableOpacity
        disabled={this.props.disabled}
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}
      >
        <Image
          source={
            this.props.disabled ? this.props.disabledImage : this.props.image
          }
          style={[styles.image, this.props.imageStyle]}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  image: {
    resizeMode: 'cover',
  },
});
