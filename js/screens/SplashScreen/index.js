import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import __ from '../../services/i18n';
import S from '../../config/styles';
import { login, loginFb } from '../../state/account/actions';
import Text from '../../components/Text';
import BigButton from '../../components/buttons/BigButton';

class SplashScreen extends React.Component {
  static screenOptions = {
    errorMessages: { 'account.fbLogin.error': {} },
    backgroundImage: require('./img/splash-bg.jpg'),
  };

  constructor(props) {
    super(props);

    if (this.props.userId) {
      const routeName =
        this.props.locationPermissions === null ? 'Intro' : 'App';
      this.props.navigation.navigate(routeName);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      (!prevProps.userId && this.props.userId) ||
      (!prevProps.isAnonymous && this.props.isAnonymous)
    ) {
      this.props.navigation.navigate('Intro');
    }
  }

  navigateLogin = () => {
    this.props.navigation.navigate('Login');
  };

  navigateSignup = () => {
    this.props.navigation.navigate('Signup');
  };

  fbLogin = () => {
    this.props.loginWithFacebook();
  };

  loginAnonymous = () => {
    this.props.navigation.navigate('Intro');
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
            loading={this.props.isFbLoginFetching}
          />
          <BigButton
            onPress={() => this.navigateLogin()}
            style={S.buttons.whiteButton}
            title={__('splashScreen.login')}
            darkTitle={true}
          />
        </View>
        <TouchableOpacity
          style={styles.skipContainer}
          onPress={this.loginAnonymous}
        >
          <Text style={styles.skipText}>{__('loginScreen.skip')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  locationPermissions: !state.permissions.location,
  userId: state.account.user.id,
  isFbLoginFetching: state.account.fbLogin.isFetching,
  isAnonymous: state.account.isAnonymous,
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
    paddingHorizontal: S.dimensions.screenOffset,
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
    height: '50%',
    paddingTop: '20%',
    justifyContent: 'center',
  },
  skipContainer: {
    height: '10%',
    alignItems: 'center',
  },
  skipText: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    color: '#989898',
  },
});
