import React from 'react';
import { View, StyleSheet } from 'react-native';
import Permissions from 'react-native-permissions';
import { connect } from 'react-redux';

import S from '../../config/styles';
import __ from '../../services/i18n';
import Text from '../../components/Text';
import { setPermission } from '../../state/permissions';
import BigButton from '../../components/BigButton';

class IntroScreen extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.hasLocationPermissions) {
      this.navigateApp();
    }
  }

  navigateApp() {
    this.props.navigation.navigate('App');
  }

  requestPermissions = async () => {
    const response = await Permissions.request('location');
    this.props.setPermission({
      type: 'location',
      value: response,
    });
    this.navigateApp();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.enableLocationText}>
            {__('introScreen.enableLocation')}
          </Text>
          <BigButton
            style={[S.buttons.whiteButton, styles.continueButton]}
            darkTitle={true}
            title={__('continue')}
            onPress={this.requestPermissions}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  hasLocationPermissions: !!state.permissions.location,
});

const mapDispatchToProps = {
  setPermission,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: S.dimensions.screenOffset,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enableLocationText: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: '10%',
  },
  textContainer: {},
  continueButton: {
    marginTop: 32,
  },
});
