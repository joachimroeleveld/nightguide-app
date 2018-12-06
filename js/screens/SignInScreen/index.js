import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import __ from '../../services/i18n';
import { login } from '../../state/account/actions';
import Text from '../../components/Text';

class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (  
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../img/logo.png')} />
        <Text>{__('signInScreen.slogan')}</Text>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login({ email, password })),
});

export default connect(
  null,
  mapDispatchToProps
)(SignInScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    marginVertical: 24,
  }
});