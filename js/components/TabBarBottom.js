import React from 'react';
import { View, StyleSheet } from 'react-native';

import S from '../config/styles';

class TabBarBottom extends React.Component {
  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

export default TabBarBottom;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#2F2F2F'
  },
});
