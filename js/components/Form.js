import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Form extends React.PureComponent {
  static propTypes = {
    values: PropTypes.object,
    onValidChange: PropTypes.func,
  };

  static defaultProps = {
    onValidChange: () => {},
  };

  static initialize(Component, initialValues) {
    Component.state = {
      ...Component.state,
      ...initialValues,
      form: initialValues,
    };

    Component.setDisplayValue = _.memoize(key => val =>
      Component.setState({ [key]: val })
    );

    Component.updateFormValue = _.memoize(key => () =>
      setTimeout(() =>
        Component.setState({
          form: { ...Component.state.form, [key]: Component.state[key] },
        })
      )
    );
  }

  valid = false;

  originalValues = Object.assign({}, this.props.values);

  validators = {};

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.validate();
  }

  registerValidator(value, validator) {
    this.validators[value] = validator;
    this.validate();
  }

  isDirty(value) {
    return this.originalValues[value] !== this.props.values[value];
  }

  getValue(value) {
    return this.props.values[value];
  }

  validate() {
    const valid = !Object.keys(this.props.values).some(value => {
      const validator = this.validators[value];

      if (!validator) {
        return false;
      }

      return validator(this.props.values[value]) !== true;
    });

    if (valid !== this.valid) {
      this.props.onValidChange(valid);

      this.valid = valid;
    }

    return valid;
  }

  render() {
    return (
      <FormContext.Provider value={this}>
        {this.props.children}
      </FormContext.Provider>
    );
  }
}

export default Form;

export const FormContext = React.createContext({});

const styles = StyleSheet.create({
  container: {},
});
