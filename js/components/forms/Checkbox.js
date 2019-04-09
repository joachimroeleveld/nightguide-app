import React, { useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';

import { usePrevious } from '../../services/hooks';
import S from '../../config/styles';

export default function Checkbox({ value }) {
  const previousVal = usePrevious(value);

  const [valueAnim] = useState(new Animated.Value(!value ? 0 : 1));

  if (value !== previousVal) {
    Animated.timing(valueAnim, {
      duration: 150,
      toValue: !value ? 0 : 1,
    }).start();
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          borderColor: valueAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [S.inputs.checkbox.borderColor, '#fff'],
          }),
        },
      ]}
    >
      {!!value && (
        <Animated.Image
          style={{
            opacity: valueAnim,
          }}
          source={require('./img/checked.png')}
        />
      )}
    </Animated.View>
  );
}

Checkbox.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
  ]),
};

const styles = StyleSheet.create({
  container: {
    ...S.inputs.checkbox,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
