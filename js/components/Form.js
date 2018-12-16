import React from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import PropTypes from 'prop-types';

class Form extends React.PureComponent {
  static propTypes = {
  };

  render() {
    return (
      <Animated.View style={[styles.container, this.props.style]}>
        <View style={styles.contents}>
          {this.props.children}
        </View>
      </Animated.View>
    );
  }
}

export default Form;

const styles = StyleSheet.create({
  container: {
  },
});
