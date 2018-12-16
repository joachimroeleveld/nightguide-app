import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class ImageButton extends React.PureComponent {
  static propTypes = {
    size: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    image: PropTypes.any,
    onPress: PropTypes.func.isRequired,
    disabledImage: PropTypes.any,
    disabled: PropTypes.bool,
  };

  render() {
    return (
      <TouchableOpacity
        disabled={this.props.disabled}
        style={[
          styles.container,
          {
            width: this.props.width || this.props.size,
            height: this.props.height || this.props.size,
          },
          this.props.style,
        ]}
        onPress={this.props.onPress}
      >
        <Image
          source={
            this.props.disabled ? this.props.disabledImage : this.props.image
          }
          style={styles.image}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  image: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
  },
});
