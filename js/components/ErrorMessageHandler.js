import { connect } from 'react-redux';
import React from 'react';
import _ from 'lodash';

import { showErrMessage } from '../state/messages/actions';
import PropTypes from 'prop-types';

class ErrorMessageHandler extends React.Component {
  static defaultProps = {
    errorMessages: {},
    errors: {},
  };

  static propTypes = {
    errorMessages: PropTypes.object,
  };

  componentDidUpdate(prevProps) {
    for (const path in this.props.errors) {
      if (
        !!this.props.errors[path] &&
        this.props.errors[path] !== prevProps.errors[path]
      ) {
        this.props.showErrMessage(this.getErrorMessage(path));
      }
    }
  }

  getErrorMessage(path) {
    const err = this.props.errors[path];
    const messages = this.props.errorMessages[path];
    const message = messages && messages[err.type];

    return message || err;
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state, ownProps) => ({
  errors: _.reduce(
    ownProps.errorMessages,
    (props, messages, path) => ({
      ...props,
      [path]: _.get(state, path),
    }),
    {}
  ),
});

const mapDispatchToProps = dispatch => ({
  showErrMessage: message => dispatch(showErrMessage(message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorMessageHandler);
