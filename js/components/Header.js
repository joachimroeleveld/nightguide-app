import React from 'react';
import { StyleSheet, View, Animated, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

import S from '../config/styles';

class Header extends React.PureComponent {
  static propTypes = {
    absolute: PropTypes.bool,
    backgroundAnimatedValue: PropTypes.instanceOf(Animated.Value),
    backgroundAnimatedValueRange: PropTypes.number,
  };

  state = {
    height: 0,
  };

  onLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }) =>
    this.setState({
      height,
    });

  render() {
    if (!this.props.absolute) {
      return (
        <View style={[styles.relativeContainer, this.props.style]}>
          {this.props.children}
        </View>
      );
    }

    const BgComponent = this.props.backgroundAnimatedValue
      ? Animated.View
      : View;

    return (
      <React.Fragment>
        <View style={styles.absoluteContainer}>
          <BgComponent
            style={[
              styles.backgroundContainer,
              { height: this.state.height },
              this.props.backgroundAnimatedValue && {
                opacity: this.props.backgroundAnimatedValue.interpolate({
                  inputRange: [
                    0,
                    this.props.backgroundAnimatedValueRange - this.state.height,
                  ],
                  outputRange: [0, 1],
                }),
              },
            ]}
          />
          <SafeAreaView onLayout={this.onLayout}>
            <View style={styles.contentContainer}>{this.props.children}</View>
          </SafeAreaView>
        </View>
        {!this.props.backgroundAnimatedValue && (
          <View style={{ height: this.state.height }} />
        )}
      </React.Fragment>
    );
  }
}

export default Header;

const styles = StyleSheet.create({
  relativeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  absoluteContainer: {
    position: 'absolute',
    zIndex: 10,
    width: '100%',
  },
  backgroundContainer: {
    position: 'absolute',
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: S.colors.separatorColor,
    backgroundColor: S.colors.defaultScreenColor,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 8,
    paddingHorizontal: S.dimensions.screenOffset,
  },
});
