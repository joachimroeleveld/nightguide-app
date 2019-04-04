import React, { useEffect, useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';

import S from '../../../config/styles';
import __ from '../../../services/i18n';
import ToggleButton from '../../../components/buttons/ToggleButton';

function VenueFilterBar({ onFilterPress, scrollPos, style }) {
  let lastScrollValue = 0;
  let scrollingUp = false;

  const [height, setHeight] = useState(0);
  const [barAnimTranslate, setBarAnimTranslate] = useState(
    new Animated.Value(0)
  );
  const [barAnimOpacity, setBarAnimOpacity] = useState(new Animated.Value(0));

  const setAnimations = (up = false) => {
    if (up) {
      setBarAnimTranslate(
        scrollPos.interpolate({
          inputRange: [
            lastScrollValue - height - 1,
            lastScrollValue - height,
            lastScrollValue,
            lastScrollValue + 1,
          ],
          outputRange: [0, 0, -height, -height],
        })
      );
      setBarAnimOpacity(
        scrollPos.interpolate({
          inputRange: [
            lastScrollValue - height,
            lastScrollValue - height * 0.5,
            lastScrollValue,
            lastScrollValue + 1,
          ],
          outputRange: [1, 0, 0, 0],
        })
      );
    } else {
      setBarAnimTranslate(
        scrollPos.interpolate({
          inputRange: [
            lastScrollValue - 1,
            lastScrollValue,
            lastScrollValue + height,
            lastScrollValue + height + 1,
          ],
          outputRange: [0, 0, -height, -height],
        })
      );
      setBarAnimOpacity(
        scrollPos.interpolate({
          inputRange: [
            lastScrollValue - 1,
            lastScrollValue,
            lastScrollValue + height * 0.5,
            lastScrollValue + height,
          ],
          outputRange: [1, 1, 0, 0],
        })
      );
    }
  };

  useEffect(() => {
    scrollPos.addListener(scrollListener);
    setAnimations();
    return () => scrollPos.removeListener(scrollListener);
  }, [height]);

  const scrollListener = ({ value }) => {
    if (value < 0) return;
    const dy = Math.abs(value - lastScrollValue);
    if (dy < 1) return;
    const newScrollingUp = value < lastScrollValue;
    if (scrollingUp !== newScrollingUp) {
      setAnimations(newScrollingUp);
    }

    scrollingUp = newScrollingUp;
    lastScrollValue = value;
  };

  const onLayout = ({
    nativeEvent: {
      layout: { height: newHeight },
    },
  }) => {
    // Only set once
    if (height) {
      return;
    }
    setHeight(newHeight);
  };

  return (
    <Animated.View
      onLayout={onLayout}
      style={[
        styles.container,
        { transform: [{ translateY: barAnimTranslate }] },
        style,
      ]}
    >
      <Animated.View style={{ opacity: barAnimOpacity }}>
        <ToggleButton
          title={`${__('listScreen.filters')} \u00B7 1`}
          onPress={onFilterPress}
        />
      </Animated.View>
    </Animated.View>
  );
}

VenueFilterBar.propTypes = {
  onFilterPress: PropTypes.func.isRequired,
  scrollPos: PropTypes.instanceOf(Animated.Value).isRequired,
};

export default VenueFilterBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    backgroundColor: S.colors.defaultScreenColor,
    paddingTop: 6,
    paddingBottom: 8,
  },
});
