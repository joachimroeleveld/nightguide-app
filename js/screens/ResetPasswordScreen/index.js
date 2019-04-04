import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import __ from '../../services/i18n';
import { resetPassword } from '../../state/account/actions';
import { showOkMessage, showWarnMessage } from '../../state/messages';
import S from '../../config/styles';
import Header from '../../components/header/Header';
import FormItem from '../../components/forms/FormItem';
import Form from '../../components/forms/Form';
import HeaderBackButton from '../../components/header/HeaderBackButton';
import BigButton from '../../components/buttons/BigButton';
import TextInput from '../../components/forms/TextInput';

class ResetPasswordScreen extends React.Component {
  static screenOptions = {
    errorMessages: {
      'account.resetPassword.error': {
        not_found: __('resetPasswordScreen.emailNotFound'),
        validation_error: __('resetPasswordScreen.invalidEmail'),
      },
    },
    backgroundImage: require('../../img/login-bg.jpg'),
  };

  state = {
    formValid: false,
    form: {
      email: null,
    },
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.success && this.props.success) {
      this.props.showOkMessage(__('resetPasswordScreen.passwordResetSuccess'));
      this.props.navigation.goBack();
    }
  }

  onSubmit = () => {
    this.form.commit();
    if (!this.state.formValid) {
      return this.props.showWarnMessage(__('fixFormErrors'));
    }
    this.props.resetPassword(_.trim(this.state.form.email));
  };

  handleOnChange = _.memoize(key => val => {
    this.setState({ form: { ...this.state.form, [key]: val } });
  });

  handleCommitValue = _.memoize(key => () => this.form.commitValue(key));

  onFormValidChange = formValid => this.setState({ formValid });

  setFormRef = ref => (this.form = ref);

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Header>
            <HeaderBackButton />
          </Header>
          <Form
            onValidChange={this.onFormValidChange}
            values={this.state.form}
            style={styles.form}
            ref={this.setFormRef}
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
                onChangeText={this.handleOnChange('email')}
                onBlur={this.handleCommitValue('email')}
                val={this.state.form.email}
              />
            </FormItem>
            <BigButton
              style={[S.buttons.submitButton, S.buttons.whiteButton]}
              title={__('resetPasswordScreen.resetPassword')}
              darkTitle={true}
              onPress={this.onSubmit}
              loading={this.props.isFetching}
            />
          </Form>
        </View>
      </KeyboardAwareScrollView>
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
    padding: S.dimensions.screenOffset,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
});
