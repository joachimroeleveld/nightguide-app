import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import __ from '../../services/i18n';
import { dimensions, colors } from '../../config/styleVars';
import { login } from '../../state/account/actions';
import Text from '../../components/Text';
import Button from '../../components/Button';

class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.brandContainer}>
          <Image style={styles.logo} source={require('../../img/logo.png')} />
          <Text style={styles.slogan}>{__('signInScreen.slogan')}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={[styles.button, styles.signUpButton]}
            title={__('signInScreen.signUp')}
          />
          <Button
            style={[styles.button, styles.fbButton]}
            title={__('signInScreen.fbLogin')}
          />
          <Button
            style={[styles.button, styles.loginButton]}
            title={__('signInScreen.login')}
            titleStyle={styles.loginButtonTitle}
          />
        </View>
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
  },
  logo: {
    marginVertical: 24,
  },
  slogan: {
    fontStyle: 'italic',
    fontSize: 18,
  },
  brandContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '40%',
  },
  buttonContainer: {
    height: '60%',
    paddingTop: '20%',
    justifyContent: 'center',
    marginHorizontal: dimensions.screenOffset,
  },
  button: {
    padding: 10,
    marginVertical: 8,
    borderRadius: 20,
  },
  signUpButton: {
    backgroundColor: '#A85FB3',
  },
  fbButton: {
    backgroundColor: '#33558D',
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
  },
  loginButtonTitle: {
    color: colors.textDark,
  },
});
