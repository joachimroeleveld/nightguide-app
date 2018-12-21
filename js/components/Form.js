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

  state = {
    originalValues: Object.assign({}, this.props.values),
  };

  _valid = false;

  items = {};

  registerItem = (value, item) => {
    this.items[value] = item;
    this.validate();
  };

  isValueDirty = value => {
    return this.state.originalValues[value] !== this.props.values[value];
  };

  getValue = value => {
    return this.props.values[value];
  };

  setDirty = () => {
    this.setState({
      originalValues: _.mapValues(this.state.originalValues, () => '@@'),
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.validate();

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

    if (valid !== this._valid) {
      this.props.onValidChange(valid);

      this._valid = valid;
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
