import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Image } from 'react-native';

import S from '../../config/styles';
import { showOkMessage } from '../../state/messages/actions';
import { logout } from '../../state/account/actions';
import __ from '../../services/i18n';
import Text from '../../components/Text';
import BigButton from '../../components/BigButton';
import Header from '../../components/Header';
import HeaderTitle from '../../components/HeaderTitle';
import Section from '../../components/Section';
import LabeledText from '../../components/LabeledText';

class ProfileScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: <Image source={require('../../img/tabbar/profile.png')} />,
  };

  onLogoutPress = () => {
    this.props.logout();
    this.props.navigation.navigate('Auth');
    this.props.showOkMessage(__('profileScreen.loggedOutMessage'));
  };

  onFeedbackPress = () => {
    this.props.navigation.navigate('Feedback');
  };

  render() {
    return (
      <View style={styles.container}>
        <Header>
          <HeaderTitle>{__('profileScreen.profile')}</HeaderTitle>
        </Header>
        <Section padding={'bottom'}>
          <LabeledText label={__('profileScreen.email')}>
            {this.props.email}
          </LabeledText>
        </Section>
        <Section>
          <Text style={styles.feedbackText}>
            {__('profileScreen.feedbackText')}
          </Text>
          <BigButton
            title={__('profileScreen.giveFeedback')}
            style={S.buttons.whiteButtonSecondary}
            onPress={this.onFeedbackPress}
          />
        </Section>
        <Section border={'none'}>
          <BigButton
            title={__('profileScreen.logout')}
            style={S.buttons.whiteButton}
            darkTitle={true}
            onPress={this.onLogoutPress}
          />
        </Section>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  email: state.account.user.email,
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
  },
  loggedInAsText: {
    marginVertical: 12,
  },
  feedbackText: {
    marginBottom: 14,
  },
});
