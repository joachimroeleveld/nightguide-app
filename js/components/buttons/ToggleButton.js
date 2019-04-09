import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import PropTypes from 'prop-types';

import Text from '../Text';
import S from '../../config/styles';
import { usePrevious } from '../../services/hooks';

function ToggleButton({ title, style, active = false, onPress, type = null }) {
  const [activeAnim] = useState(new Animated.Value(active ? 1 : 0));

  const prevActive = usePrevious(active);

  if (prevActive !== active) {
    Animated.timing(activeAnim, {
      duration: 100,
      toValue: active ? 1 : 0,
    }).start();
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={[
          styles.container,
          {
            borderColor: activeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [styles.container.borderColor, '#fff'],
            }),
            backgroundColor: activeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
            }),
          },
          style,
        ]}
      >
        <Animated.Text
          style={[
            styles.title,
            {
              color: activeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [S.colors.textDefault, S.colors.textDark],
              }),
            },
          ]}
        >
          {title}
        </Animated.Text>
        {type === 'sort' && <Text>{'\u00f3n'}</Text>}
      </Animated.View>
    </TouchableOpacity>
  );
}

ToggleButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default ToggleButton;

const styles = StyleSheet.create({
  container: {
    ...S.buttons.toggleButton,
  },
  title: {
    fontSize: 14,
  },
});
