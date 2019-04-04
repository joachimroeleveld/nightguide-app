import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';

import S from '../../config/styles';
import __ from '../../services/i18n';
import { FormContext } from './Form';

class FormItem extends React.PureComponent {
  static propTypes = {
    label: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    value: PropTypes.string.isRequired,
    required: PropTypes.bool,
    validator: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  };

  static contextType = FormContext;

  static validators = {
    email: val =>
      (!!val && /^[^@]+@[^@]+$/.test(val)) || __('signupScreen.invalidEmail'),
    passwordRepeat: (val, form) =>
      val === form.getValue('password') ||
      __('signupScreen.passwordsShouldMatch'),
  };

  get validator() {
    let validators = [];
    if (this.props.required) {
      validators.push(() => !!this.formValue || __('requiredField'));
    }
    if (this.props.validator) {
      validators.push(val => this.props.validator(val, this.form));
    }
    const validator = val =>
      validators.reduce((result, validator) => {
        if (result !== true) return result;
        return validator(val);
      }, true);
    return validator || (() => true);
  }

  get form() {
    return this.context;
  }

  get formValue() {
    return this.form.getValue(this.props.value);
  }

  get isCommitted() {
    return this.form.isValueCommitted(this.props.value);
  }

  get isValid() {
    return this.validator(this.formValue) === true;
  }

  get validationMessage() {
    return !this.isValid && this.validator(this.formValue);
  }

  componentDidMount() {
    this.form.registerItem(this.props.value, this);
  }

  render() {
    const showErrMessage = this.isCommitted && !this.isValid;

    return (
      <View style={[styles.container, this.props.style]}>
        {!!this.props.label && (
          <Text style={styles.label}>{this.props.label}</Text>
        )}
        {this.props.children}
        {showErrMessage && (
          <View style={styles.errMessageContainer}>
            <Text style={styles.errMessageText}>{this.validationMessage}</Text>
          </View>
        )}
      </View>
    );
  }
}

export default FormItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    color: S.colors.textDefault,
    marginBottom: 2,
  },
  errMessageContainer: {
    marginTop: 2,
  },
  errMessageText: {
    fontSize: 12,
    color: S.colors.textError,
  },
});
