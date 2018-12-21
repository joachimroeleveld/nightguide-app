import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import __ from '../../services/i18n';
import { resetPassword } from '../../state/account/actions';
import { showOkMessage, showWarnMessage } from '../../state/messages/actions';
import S from '../../config/styles';
import Header from '../../components/Header';
import FormItem from '../../components/FormItem';
import Form from '../../components/Form';
import HeaderBackButton from '../../components/HeaderBackButton';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { NavigationActions } from 'react-navigation';

class ResetPasswordScreen extends React.Component {
  static screenOptions = {
    errorMessages: {
      'account.resetPassword.error': {
        not_found: __('resetPasswordScreen.emailNotFound'),
        validation_error: __('resetPasswordScreen.invalidEmail'),
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
    });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.success && this.props.success) {
      this.props.showOkMessage(__('resetPasswordScreen.passwordResetSuccess'));
      this.props.navigation.dispatch(NavigationActions.back());
    }
  }

  onSubmit = () => {
    if (!this.state.formValid) {
      return this.props.showWarnMessage(__('missingFields'));
    }
    this.props.resetPassword(this.state.email);
  };

  onFormValidChange = formValid => this.setState({ formValid });

  render() {
    return (
      <View style={styles.container}>
        <Header absolute={true}>
          <HeaderBackButton />
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
            label={__('resetPasswordScreen.email')}
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
          <Button
            style={[
              S.buttons.bigButton,
              S.buttons.submitButton,
              S.buttons.whiteButton,
            ]}
            disabled={this.props.isFetching}
            title={__('resetPasswordScreen.resetPassword')}
            darkTitle={true}
            onPress={this.onSubmit}
          />
        </Form>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.account.resetPassword.isFetching,
  success: state.account.resetPassword.success,
});

const mapDispatchToProps = dispatch => ({
  resetPassword: email => dispatch(resetPassword({ email })),
  showOkMessage: message => dispatch(showOkMessage(message)),
  showWarnMessage: message => dispatch(showWarnMessage(message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordScreen);

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
