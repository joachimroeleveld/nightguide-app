import React from 'react';
import { StyleSheet, View } from 'react-native';
import _ from 'lodash';

import Tag from '../../Tag';
import __ from '../../../services/i18n';

const VisitorTypes = ({ types }) => {
  return (
    <View style={styles.container}>
      {types.map((type, index) => (
        <Tag
          key={type}
          style={[styles.tag, index === types.length - 1 && styles.lastTag]}
          title={__(`venue.visitorTypes.${_.camelCase(type)}`)}
        />
      ))}
    </View>
  );
};

export default VisitorTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: -5,
    marginBottom: -5,
  },
  tag: {
    marginRight: 6,
    marginVertical: 3,
  },
  lastTag: {
    marginRight: 0,
  },
});
