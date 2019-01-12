import React from 'react';
import { View, StyleSheet, Geolocation } from 'react-native';

import S from '../../config/styles';
import __ from '../../services/i18n';
import Text from '../../components/Text';

class IntroScreen extends React.Component {
  componentDidMount() {
    Geolocation.requestAuthorization().then(({ status }) => {

    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.enableLocationText}>
          {__('introScreen.enableLocation')}
        </Text>
      </View>
    );
  }
}

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: S.dimensions.screenOffset,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enableLocationText: {
    fontSize: 22,
    textAlign: 'center',
  },
});
