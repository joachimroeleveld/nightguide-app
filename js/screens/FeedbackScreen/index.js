import React from 'react';
import { View, StyleSheet } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';

import S from '../../config/styles';
import { showOkMessage, showWarnMessage } from '../../state/messages/actions';
import { sendFeedback } from '../../state/account/actions';
import __ from '../../services/i18n';
import Header from '../../components/Header';
import HeaderBackButton from '../../components/HeaderBackButton';
import HeaderTitle from '../../components/HeaderTitle';
import BigButton from '../../components/BigButton';
import Form from '../../components/Form';
import FormItem from '../../components/FormItem';
import TextInput from '../../components/TextInput';
import Text from '../../components/Text';

class FeedbackScreen extends React.Component {
  static screenOptions = {
    errorMessages: {
      'account.sendFeedback.error': {},
    },
  };

  state = {
    formValid: false,
    form: {
      message: null,
    },
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.success && this.props.success) {
      this.props.showOkMessage(__('feedbackScreen.submitSuccess'));
    }
  }

  onSubmit = () => {
    this.form.commit();
    if (!this.state.formValid) {
      return this.props.showWarnMessage(__('fixFormErrors'));
    }
    this.props.sendFeedback(this.state.form.message);
    this.props.navigation.goBack();
  };

  handleOnChange = _.memoize(key => val => {
    this.setState({ form: { ...this.state.form, [key]: val } });
  });

  handleCommitValue = _.memoize(key => () => this.form.commitValue(key));

  onFormValidChange = formValid => {
    this.setState({ formValid });
  };

  setFormRef = ref => (this.form = ref);

  render() {
    return (
      <View style={styles.container}>
        <Header>
          <HeaderBackButton variant={'close'} />
          <HeaderTitle>{__('feedbackScreen.feedback')}</HeaderTitle>
        </Header>
        <Text>{__('profileScreen.feedbackText')}</Text>
        <Form
          onValidChange={this.onFormValidChange}
          values={this.state.form}
          ref={this.setFormRef}
        >
          <FormItem
            style={styles.messageFormItem}
            required={true}
            value={'message'}
          >
            <TextInput
              onChangeText={this.handleOnChange('message')}
              onBlur={this.handleCommitValue('message')}
              val={this.state.form.message}
              placeholder={__('feedbackScreen.enterMessage')}
              multiline={true}
              numberOfLines={4}
              style={styles.messageInput}
            />
          </FormItem>
          <BigButton
            onPress={this.onSubmit}
            style={S.buttons.whiteButton}
            disabled={this.props.isFetching}
            title={__('submit')}
            darkTitle={true}
          />
        </Form>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.account.sendFeedback.isFetching,
  success: state.account.sendFeedback.success,
});

const mapDispatchToProps = dispatch => ({
  showWarnMessage: message => dispatch(showWarnMessage(message)),
  showOkMessage: message => dispatch(showOkMessage(message)),
  sendFeedback: message => dispatch(sendFeedback(message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageFormItem: {
    marginVertical: S.dimensions.sectionVPadding,
  },
  messageInput: {
    height: 80,
  },
});
