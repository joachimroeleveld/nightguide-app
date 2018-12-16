import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import __ from '../../services/i18n';
import { login } from '../../state/account/actions';
import S from '../../config/styles';
import Header from '../../components/Header';
import FormItem from '../../components/FormItem';
import Form from '../../components/Form';
import HeaderBackButton from '../../components/HeaderBackButton';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

class LoginScreen extends React.Component {
  static screenOptions = {
    errorMessages: {
      'account.login.error': {
        user_not_found: __('loginScreen.userNotFound'),
        user_not_verified: __('loginScreen.userNotVerified'),
        incorrect_credentials: __('loginScreen.incorrectCredentials'),
        validation_error: __('loginScreen.invalidEmail'),
      },
    },
  };

  get form() {
    return {
      email: this.state.email,
      password: this.state.password,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  onSubmit = () => {
    this.props.login(this.form.email, this.form.password);
  };

  showResetPassword = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({ routeName: 'ResetPassword' })
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header absolute={true}>
          <HeaderBackButton />
          <Button
            onPress={this.showResetPassword}
            title={__('loginScreen.forgotPassword')}
          />
        </Header>
        <Form style={styles.form}>
          <FormItem label={__('loginScreen.email')}>
            <TextInput
              textContentType={'emailAddress'}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={email => this.setState({ email })}
              val={this.form.email}
            />
          </FormItem>
          <FormItem label={__('loginScreen.password')}>
            <TextInput
              textContentType={'password'}
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
              val={this.form.password}
            />
          </FormItem>
          <Button
            style={[
              S.buttons.bigButton,
              S.buttons.submitButton,
              S.buttons.whiteButton,
            ]}
            disabled={this.props.isFetching}
            title={__('loginScreen.login')}
            darkTitle={true}
            onPress={this.onSubmit}
          />
        </Form>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.account.login.isFetching,
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login({ email, password })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: S.dimensions.screenOffset,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
});
