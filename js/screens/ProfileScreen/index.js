import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, Image } from 'react-native';

import S from '../../config/styles';
import { showOkMessage } from '../../state/messages';
import { logout } from '../../state/account/actions';
import __ from '../../services/i18n';
import Text from '../../components/Text';
import BigButton from '../../components/buttons/BigButton';
import Title from '../../components/Title';
import Section from '../../components/Section';
import LabeledText from '../../components/LabeledText';
import { eventBus } from '../../services/analytics';

class ProfileScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: <Image source={require('../../img/tabbar/profile.png')} />,
  };

  onLogoutPress = () => {
    this.props.logout();
    this.props.navigation.navigate('Auth');
    this.props.showOkMessage(__('profileScreen.loggedOutMessage'));
    eventBus.logout();
  };

  onFeedbackPress = () => {
    this.props.navigation.navigate('Feedback');
  };

  onLoginPress = () => {
    this.props.logout();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Title>{__('profileScreen.profile')}</Title>
        <React.Fragment>
          {this.props.isAnonymous && (
            <Section padding={'bottom'}>
              <Text style={styles.buttonText}>
                {__('profileScreen.loginText')}
              </Text>
              <BigButton
                title={__('profileScreen.login')}
                style={S.buttons.whiteButton}
                darkTitle={true}
                onPress={this.onLoginPress}
              />
            </Section>
          )}
          {!this.props.isAnonymous && (
            <Section padding={'bottom'}>
              <LabeledText label={__('profileScreen.email')}>
                {this.props.email}
              </LabeledText>
            </Section>
          )}
          <Section>
            <Text style={styles.buttonText}>
              {__('profileScreen.feedbackText')}
            </Text>
            <BigButton
              title={__('profileScreen.giveFeedback')}
              style={S.buttons.whiteButtonSecondary}
              onPress={this.onFeedbackPress}
            />
          </Section>
          {!this.props.isAnonymous && (
            <Section border={'none'}>
              <BigButton
                title={__('profileScreen.logout')}
                style={S.buttons.whiteButton}
                darkTitle={true}
                onPress={this.onLogoutPress}
              />
            </Section>
          )}
        </React.Fragment>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  email: state.account.user.email,
  isAnonymous: state.account.isAnonymous,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  showOkMessage: message => dispatch(showOkMessage(message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: S.dimensions.screenOffset,
  },
  loggedInAsText: {
    marginVertical: 12,
  },
  buttonText: {
    marginBottom: 14,
  },
});
