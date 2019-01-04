import React from 'react';
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

  get allItemsRegistered() {
    return Object.keys(this.props.values).every(value => !!this.items[value]);
  }

  state = {
    committedValues: Object.keys(this.props.values).reduce(
      (values, key) => ({
        ...values,
        [key]: false,
      }),
      {}
    ),
  };

  valid = false;

  items = {};

  registerItem = (value, item) => {
    this.items[value] = item;
    if (this.allItemsRegistered) {
      this.validate();
    }
  };

  getValue = value => {
    return this.props.values[value];
  };

  isValueCommitted = value => this.state.committedValues[value];

  commitValue = value =>
    this.setState({
      committedValues: { ...this.state.committedValues, [value]: true },
    });

  commit = () =>
    this.setState({
      committedValues: _.mapValues(this.state.committedValues, () => true),
    });

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.allItemsRegistered) {
      this.validate();
    }
    // Rerender form item when form state changes
    _.each(this.items, item => item.forceUpdate());
  }

  validate() {
    const valid = !Object.keys(this.props.values).some(value => {
      const validator = this.items[value].validator;

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
