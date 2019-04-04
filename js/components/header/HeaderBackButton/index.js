import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import S from '../../../config/styles';
import ImageButton from '../../ImageButton';

class HeaderBackButton extends React.PureComponent {
  static propTypes = {
    variant: PropTypes.oneOf(['back', 'close']),
    imageStyle: PropTypes.any,
  };

  static defaultProps = {
    variant: 'back',
  };

  get image() {
    return this.props.variant === 'back'
      ? require('./img/back.png')
      : require('./img/close.png');
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <ImageButton
          image={this.image}
          onPress={this.props.onPress || (() => this.props.navigation.goBack())}
          imageStyle={this.props.imageStyle}
          style={styles.button}
        />
      </View>
    );
  }
}

export default withNavigation(HeaderBackButton);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  button: {
    width: 30,
    marginLeft: -10,
    paddingHorizontal: 10,
    paddingVertical: 14,
    tintColor: S.colors.textDefault,
  },
});
