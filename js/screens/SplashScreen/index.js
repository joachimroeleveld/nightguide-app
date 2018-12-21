import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import __ from '../../services/i18n';
import S from '../../config/styles';
import { login, loginFb } from '../../state/account/actions';
import Text from '../../components/Text';
import Button from '../../components/Button';

class SplashScreen extends React.Component {
  static screenOptions = {
    messages: { err: { 'account.fbLogin.error': {} } },
    backgroundImage: require('./img/splash-bg.png'),
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      this.props.navigation.dispatch(
        NavigationActions.navigate({ routeName: 'App' }),
      );
    }
  }

  showLogin = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({ routeName: 'Login' })
    );
  };

  fbLogin = () => {
    this.props.loginWithFacebook();
  };

  showSignup = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({ routeName: 'Signup' })
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.brandContainer}>
          <Image style={styles.logo} source={require('../../img/logo.png')} />
          <Text style={styles.slogan}>{__('splashScreen.slogan')}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.showSignup()}
            style={[S.buttons.bigButton, S.buttons.purpleButton]}
            title={__('splashScreen.signUp')}
          />
          <Button
            onPress={() => this.fbLogin()}
            style={[S.buttons.bigButton, S.buttons.blueButton]}
            title={__('splashScreen.loginFb')}
          />
          <Button
            onPress={() => this.showLogin()}
            style={[S.buttons.bigButton, S.buttons.whiteButton]}
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
    marginHorizontal: S.dimensions.screenOffset,
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
