import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';

import S from '../../config/styles';
import { showOkMessage, showWarnMessage } from '../../state/messages';
import { sendFeedback } from '../../state/feedback';
import __ from '../../services/i18n';
import Header from '../../components/Header';
import HeaderBackButton from '../../components/HeaderBackButton';
import Title from '../../components/Title';
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
      this.props.navigation.goBack();
    }
  }

  onSubmit = () => {
    this.form.commit();
    if (!this.state.formValid) {
      return this.props.showWarnMessage(__('fixFormErrors'));
    }
    this.props.sendFeedback(this.state.form.message);
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
        <Header absolute={true}>
          <HeaderBackButton variant={'close'} />
        </Header>
        <ScrollView style={styles.contentContainer}>
          <Title>{__('feedbackScreen.feedback')}</Title>
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
                style={styles.messageInput}
              />
            </FormItem>
            <BigButton
              onPress={this.onSubmit}
              style={S.buttons.whiteButton}
              title={__('submit')}
              darkTitle={true}
              loading={this.props.isFetching}
            />
          </Form>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.feedback.isFetching,
  success: state.feedback.success,
});

const mapDispatchToProps = {
  showWarnMessage,
  showOkMessage,
  sendFeedback,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: S.dimensions.screenOffset,
  },
  messageFormItem: {
    marginVertical: S.dimensions.sectionVPadding,
  },
  messageInput: {
    height: 80,
  },
});
