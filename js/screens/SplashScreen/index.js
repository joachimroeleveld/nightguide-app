import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import __ from '../../services/i18n';
import S from '../../config/styles';
import { login, loginFb } from '../../state/account/actions';
import Text from '../../components/Text';
import BigButton from '../../components/BigButton';

class SplashScreen extends React.Component {
  static screenOptions = {
    messages: { err: { 'account.fbLogin.error': {} } },
    backgroundImage: require('./img/splash-bg.png'),
  };

  constructor(props) {
    super(props);

    if (this.props.loggedIn) {
      this.navigateAuthenticated();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      this.navigateAuthenticated();
    }
  }

  navigateAuthenticated = () => {
    this.props.navigation.navigate('App');
  };

  navigateLogin = () => {
    this.props.navigation.navigate('Login');
  };

  navigateSignup = () => {
    this.props.navigation.navigate('Signup');
  };

  fbLogin = () => {
    this.props.loginWithFacebook();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.brandContainer}>
          <Image style={styles.logo} source={require('../../img/logo.png')} />
          <Text style={styles.slogan}>{__('splashScreen.slogan')}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <BigButton
            onPress={() => this.navigateSignup()}
            style={S.buttons.purpleButton}
            title={__('splashScreen.signUp')}
          />
          <BigButton
            onPress={() => this.fbLogin()}
            style={S.buttons.blueButton}
            title={__('splashScreen.loginFb')}
          />
          <BigButton
            onPress={() => this.navigateLogin()}
            style={S.buttons.whiteButton}
            title={__('splashScreen.login')}
            darkTitle={true}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.account.token,
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login({ email, password })),
  loginWithFacebook: () => dispatch(loginFb()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen);

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
  },
});
