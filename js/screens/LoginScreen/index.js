import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import __ from '../../services/i18n';
import { login } from '../../state/account/actions';
import { showWarnMessage } from '../../state/messages/actions';
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
    backgroundImage: require('../../img/login-bg.png'),
  };

  state = {
    formValid: false,
  };

  constructor(props) {
    super(props);

    Form.initialize(this, {
      email: null,
      password: null,
    });
  }

  onSubmit = () => {
    if (!this.state.formValid) {
      return this.props.showWarnMessage(__('missingFields'));
    }
    this.props.login(this.state.form.email, this.state.form.password);
  };

  showResetPassword = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({ routeName: 'ResetPassword' })
    );
  };

  onFormValidChange = formValid => this.setState({ formValid });

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
        <Form
          onValidChange={this.onFormValidChange}
          values={this.state.form}
          style={styles.form}
        >
          <FormItem
            required={true}
            validator={FormItem.validators.email}
            value={'email'}
            label={__('loginScreen.email')}
          >
            <TextInput
              textContentType={'emailAddress'}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={this.setDisplayValue('email')}
              onBlur={this.updateFormValue('email')}
              val={this.state.email}
            />
          </FormItem>
          <FormItem
            required={true}
            value={'password'}
            label={__('loginScreen.password')}
          >
            <TextInput
              textContentType={'password'}
              secureTextEntry={true}
              onChangeText={this.setDisplayValue('password')}
              onBlur={this.updateFormValue('password')}
              val={this.state.password}
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
  showWarnMessage: message => dispatch(showWarnMessage(message)),
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
