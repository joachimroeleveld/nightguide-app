import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import __ from '../../services/i18n';
import { login } from '../../state/account/actions';
import { showWarnMessage } from '../../state/messages/actions';
import S from '../../config/styles';
import Header from '../../components/Header';
import FormItem from '../../components/FormItem';
import DatePicker from '../../components/DatePicker';
import Picker from '../../components/Picker';
import Form from '../../components/Form';
import HeaderBackButton from '../../components/HeaderBackButton';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

class SignupScreen extends React.Component {
  static screenOptions = {
    errorMessages: {
      'account.signup.error': {},
    },
    backgroundImage: require('./img/signup-bg.png'),
  };

  state = {
    formValid: false,
  };

  constructor(props) {
    super(props);

    Form.initialize(this, {
      email: null,
      firstName: null,
      lastName: null,
      password: null,
      birthday: undefined,
      gender: null,
    });
  }

  onSubmit = () => {
    if (!this.state.formValid) {
      return this.props.showWarnMessage(__('missingFields'));
    }
    this.props.signup(this.state);
  };

  handleBirthdayPicked = birthday => {
    this.setDisplayValue('birthday')(birthday);
    this.updateFormValue('birthday')(birthday);
  };

  handleGenderPicked = gender => {
    this.setDisplayValue('gender')(gender);
    this.updateFormValue('gender')(gender);
  };

  onFormValidChange = formValid => {
    this.setState({ formValid });
  };

  setFormRef = ref => (this.form = ref);

  render() {
    return (
      <View style={styles.container}>
        <Header absolute={true}>
          <HeaderBackButton />
        </Header>
        <Form
          ref={this.setFormRef}
          onValidChange={this.onFormValidChange}
          values={this.state.form}
          style={styles.form}
        >
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
              onChangeText={this.setDisplayValue('email')}
              onBlur={this.updateFormValue('email')}
              val={this.state.email}
            />
          </FormItem>
          <FormItem
            required={true}
            value={'firstName'}
            label={__('signupScreen.firstName')}
          >
            <TextInput
              textContentType={'name'}
              onBlur={this.updateFormValue('firstName')}
              onChangeText={this.setDisplayValue('firstName')}
              val={this.state.firstName}
            />
          </FormItem>
          <FormItem
            required={true}
            value={'lastName'}
            label={__('signupScreen.lastName')}
          >
            <TextInput
              textContentType={'familyName'}
              onBlur={this.updateFormValue('lastName')}
              onChangeText={this.setDisplayValue('lastName')}
              val={this.state.lastName}
            />
          </FormItem>
          <FormItem
            value={'password'}
            required={true}
            label={__('signupScreen.password')}
          >
            <TextInput
              textContentType={'password'}
              secureTextEntry={true}
              onBlur={this.updateFormValue('password')}
              onChangeText={this.setDisplayValue('password')}
              val={this.state.password}
            />
          </FormItem>
          {this.state.password !== null && (
            <Animatable.View animation="fadeInDown">
              <FormItem
                value={'passwordRepeat'}
                validator={FormItem.validators.passwordRepeat}
                label={__('signupScreen.repeatPassword')}
              >
                <TextInput
                  textContentType={'password'}
                  secureTextEntry={true}
                  onBlur={this.updateFormValue('passwordRepeat')}
                  onChangeText={this.setDisplayValue('passwordRepeat')}
                  val={this.state.passwordRepeat}
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
              date={this.state.birthday}
              onSelect={this.handleBirthdayPicked}
            />
          </FormItem>
          <FormItem
            value={'gender'}
            required={true}
            label={__('signupScreen.gender')}
          >
            <Picker
              title={__('signupScreen.selectGender')}
              selectedValue={this.state.gender}
              onSelect={this.handleGenderPicked}
            >
              <Picker.Item value="male" label={__('signupScreen.male')} />
              <Picker.Item value="female" label={__('signupScreen.female')} />
              <Picker.Item value="other" label={__('signupScreen.other')} />
            </Picker>
          </FormItem>
          <Button
            style={[
              S.buttons.bigButton,
              S.buttons.submitButton,
              S.buttons.purpleButton,
            ]}
            disabled={this.props.isFetching}
            title={__('signupScreen.createAccount')}
            onPress={this.onSubmit}
          />
        </Form>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.account.signup.isFetching,
});

const mapDispatchToProps = dispatch => ({
  signup: values => dispatch(login(values)),
  showWarnMessage: message => dispatch(showWarnMessage(message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen);

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
