import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

import S from '../config/styles';

const ScreenLoader = props => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={'large'} color={S.colors.loaderColor} />
    </View>
  );
};

export default ScreenLoader;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
