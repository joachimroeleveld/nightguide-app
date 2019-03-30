import React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import _ from 'lodash';

import __ from '../../services/i18n';
import { signup } from '../../state/account/actions';
import { showOkMessage, showWarnMessage } from '../../state/messages';
import S from '../../config/styles';
import Header from '../../components/Header';
import FormItem from '../../components/FormItem';
import DatePicker from '../../components/DatePicker';
import Picker from '../../components/Picker';
import Form from '../../components/Form';
import HeaderBackButton from '../../components/HeaderBackButton';
import BigButton from '../../components/BigButton';
import TextInput from '../../components/TextInput';

class SignupScreen extends React.Component {
  static screenOptions = {
    errorMessages: {
      'account.signup.error': {
        email_exists: __('signupScreen.emailAlreadyExists'),
      },
    },
    backgroundImage: require('./img/signup-bg.jpg'),
  };

  static validators = {
    password: val =>
      (!!val && val.length >= 6) || __('loginScreen.passwordLengthNotice'),
  };

  state = {
    formValid: false,
    form: {
      email: null,
      firstName: null,
      lastName: null,
      password: null,
      passwordRepeat: null,
      birthday: undefined,
      gender: null,
    },
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.success && this.props.success) {
      this.props.showOkMessage(__('signupScreen.accountCreated'));
      this.props.navigation.goBack();
    }
  }

  onSubmit = () => {
    this.form.commit();
    if (!this.state.formValid) {
      return this.props.showWarnMessage(__('fixFormErrors'));
    }
    const { passwordRepeat, ...values } = this.state.form;
    this.props.signup({
      ...values,
      email: _.trim(values.email),
    });
  };

  onFormValidChange = formValid => {
    this.setState({ formValid });
  };

  handleOnChange = _.memoize(key => val => {
    this.setState({ form: { ...this.state.form, [key]: val } });
  });

  handleCommitValue = _.memoize(key => () => this.form.commitValue(key));

  setFormRef = ref => (this.form = ref);

  onBirthdayPicked = val => {
    this.handleOnChange('birthday')(val);
    this.handleCommitValue('birthday')();
  };

  onGenderPicked = val => {
    this.handleOnChange('gender')(val);
    this.handleCommitValue('gender')();
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Header>
            <HeaderBackButton />
          </Header>
          <Form
            ref={this.setFormRef}
            onValidChange={this.onFormValidChange}
            values={this.state.form}
          >
            <FormItem
              required={true}
              value={'firstName'}
              label={__('signupScreen.firstName')}
            >
              <TextInput
                textContentType={'name'}
                onChangeText={this.handleOnChange('firstName')}
                onBlur={this.handleCommitValue('firstName')}
                val={this.state.form.firstName}
              />
            </FormItem>
            <FormItem
              required={true}
              value={'lastName'}
              label={__('signupScreen.lastName')}
            >
              <TextInput
                textContentType={'familyName'}
                onChangeText={this.handleOnChange('lastName')}
                onBlur={this.handleCommitValue('lastName')}
                val={this.state.form.lastName}
              />
            </FormItem>
            <FormItem
              value={'email'}
              required={true}
              validator={FormItem.validators.email}
              label={__('signupScreen.email')}
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
            <FormItem
              value={'password'}
              required={true}
              validator={SignupScreen.validators.password}
              label={__('signupScreen.password')}
            >
              <TextInput
                textContentType={'password'}
                secureTextEntry={true}
                onChangeText={this.handleOnChange('password')}
                onBlur={this.handleCommitValue('password')}
                val={this.state.form.password}
              />
            </FormItem>
            {this.state.form.password !== null && (
              <Animatable.View animation="fadeInDown">
                <FormItem
                  value={'passwordRepeat'}
                  validator={FormItem.validators.passwordRepeat}
                  label={__('signupScreen.repeatPassword')}
                >
                  <TextInput
                    textContentType={'password'}
                    secureTextEntry={true}
                    onChangeText={this.handleOnChange('passwordRepeat')}
                    onBlur={this.handleCommitValue('passwordRepeat')}
                    val={this.state.form.passwordRepeat}
                  />
                </FormItem>
              </Animatable.View>
            )}
            <FormItem
              value={'birthday'}
              required={true}
              label={__('signupScreen.birthday')}
            >
              <DatePicker
                date={this.state.form.birthday}
                onSelect={this.onBirthdayPicked}
              />
            </FormItem>
            <FormItem
              value={'gender'}
              // required={true}
              label={__('signupScreen.gender')}
            >
              <Picker
                title={__('signupScreen.selectGender')}
                selectedValue={this.state.form.gender}
                onSelect={this.onGenderPicked}
              >
                <Picker.Item value="male" label={__('signupScreen.male')} />
                <Picker.Item value="female" label={__('signupScreen.female')} />
                <Picker.Item value="other" label={__('signupScreen.other')} />
              </Picker>
            </FormItem>
            <BigButton
              style={[S.buttons.submitButton, S.buttons.purpleButton]}
              disabled={this.props.isFetching}
              title={__('signupScreen.createAccount')}
              onPress={() => this.onSubmit()}
              loading={this.props.isFetching}
            />
          </Form>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.account.signup.isFetching,
  success: state.account.signup.success,
});

const mapDispatchToProps = dispatch => ({
  signup: values => dispatch(signup(values)),
  showWarnMessage: message => dispatch(showWarnMessage(message)),
  showOkMessage: message => dispatch(showOkMessage(message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen);

const styles = StyleSheet.create({
  container: {
    padding: S.dimensions.screenOffset,
  },
});
