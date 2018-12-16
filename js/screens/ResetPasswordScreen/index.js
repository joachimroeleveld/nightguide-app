import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import __ from '../../services/i18n';
import { resetPassword } from '../../state/account/actions';
import { showOkMessage } from '../../state/messages/actions';
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
  };

  get form() {
    return {
      email: this.state.email,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.success && this.props.success) {
      this.props.showOkMessage(__('resetPasswordScreen.passwordResetSuccess'));
      this.props.navigation.dispatch(NavigationActions.back());
    }
  }

  onSubmit = () => {
    this.props.resetPassword(this.form.email);
  };

  render() {
    return (
      <View style={styles.container}>
        <Header absolute={true}>
          <HeaderBackButton />
        </Header>
        <Form style={styles.form}>
          <FormItem label={__('resetPasswordScreen.email')}>
            <TextInput
              textContentType={'emailAddress'}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={email => this.setState({ email })}
              val={this.form.email}
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
