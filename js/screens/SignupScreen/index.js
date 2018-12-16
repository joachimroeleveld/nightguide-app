import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import __ from '../../services/i18n';
import { login } from '../../state/account/actions';
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
  };

  get form() {
    return {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      birthday: this.state.birthday,
      gender: this.state.gender,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      birtday: null,
      gender: null,
    };
  }

  onSubmit = () => {
    this.props.signup(this.form);
  };

  handleBirthdayPicked = birthday => {
    this.setState({ birthday });
  };

  handleGenderPicked = gender => {
    this.setState({ gender });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header absolute={true}>
          <HeaderBackButton />
        </Header>
        <Form style={styles.form}>
          <FormItem label={__('signupScreen.email')}>
            <TextInput
              textContentType={'emailAddress'}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={email => this.setState({ email })}
              val={this.form.email}
            />
          </FormItem>
          <FormItem label={__('signupScreen.firstName')}>
            <TextInput
              textContentType={'name'}
              onChangeText={firstName => this.setState({ firstName })}
              val={this.form.firstName}
            />
          </FormItem>
          <FormItem label={__('signupScreen.lastName')}>
            <TextInput
              textContentType={'familyName'}
              onChangeText={lastName => this.setState({ lastName })}
              val={this.form.lastName}
            />
          </FormItem>
          <FormItem label={__('signupScreen.password')}>
            <TextInput
              textContentType={'password'}
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
              val={this.form.password}
            />
          </FormItem>
          {!!this.form.password && (
            <Animatable.View animation="fadeInDown">
              <FormItem label={__('signupScreen.repeatPassword')}>
                <TextInput
                  textContentType={'password'}
                  secureTextEntry={true}
                  onChangeText={password => this.setState({ password })}
                  val={this.form.password}
                />
              </FormItem>
            </Animatable.View>
          )}
          <FormItem label={__('signupScreen.birthday')}>
            <DatePicker
              date={this.state.birthday}
              onSelect={this.handleBirthdayPicked}
            />
          </FormItem>
          <FormItem label={__('signupScreen.gender')}>
            <Picker
              title={__('signupScreen.selectGender')}
              selectedValue={this.form.gender}
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
