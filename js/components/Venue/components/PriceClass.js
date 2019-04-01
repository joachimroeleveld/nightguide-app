import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import _ from 'lodash';

import Text from '../../Text';

export default function VenuePriceClass({ priceClass, style }) {
  return (
    <View style={[styles.container, style]}>
      {_.range(1, 5).map(currentPriceClass => (
        <Text
          key={currentPriceClass}
          style={[
            styles.text,
            currentPriceClass > priceClass && styles.inactiveText,
          ]}
        >
          {'€'}
        </Text>
      ))}
    </View>
  );
}

VenuePriceClass.propTypes = {
  priceClass: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {},
  inactiveText: {
    color: '#6A6A6A',
  },
});
