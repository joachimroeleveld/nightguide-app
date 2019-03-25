import React from 'react';
import { StyleSheet, View, Animated, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

import S from '../config/styles';

class Header extends React.PureComponent {
  static propTypes = {
    absolute: PropTypes.bool,
    backgroundAnimatedValue: PropTypes.instanceOf(Animated.Value),
    backgroundAnimatedValueUpperBound: PropTypes.number,
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
          {!!this.props.backgroundAnimatedValue && (
            <LinearGradient
              style={styles.topGradient}
              colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}
            />
          )}
          <BgComponent
            style={[
              styles.backgroundContainer,
              { height: this.state.height },
              this.props.backgroundAnimatedValue && {
                opacity: this.props.backgroundAnimatedValue.interpolate({
                  inputRange: [
                    this.props.backgroundAnimatedValueUpperBound -
                      this.state.height * 2,
                    this.props.backgroundAnimatedValueUpperBound -
                      this.state.height,
                  ],
                  outputRange: [0, 1],
                }),
              },
            ]}
          />
          <SafeAreaView
            style={styles.contentOuterContainer}
            onLayout={this.onLayout}
          >
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
    zIndex: 2,
    position: 'absolute',
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: S.colors.separatorColor,
    backgroundColor: S.colors.defaultScreenColor,
  },
  contentOuterContainer: {
    zIndex: 3,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 8,
    paddingHorizontal: S.dimensions.screenOffset,
  },
  topGradient: {
    height: 90,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },
});
