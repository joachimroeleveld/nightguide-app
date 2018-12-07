import * as React from 'react';
import { withNavigation } from 'react-navigation';
import { BackHandler } from 'react-native';

class BackHandlerAndroid extends React.Component {
  didFocusSubscription;
  willBlurSubscription;

  constructor(props) {
    super(props);
    this.didFocusSubscription = props.navigation.addListener(
      'didFocus',
      payload =>
        BackHandler.addEventListener('hardwareBackPress', this.onBackPressed)
    );
  }

  componentDidMount() {
    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      payload =>
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed)
    );
  }

  onBackPressed = () => {
    return this.props.navigation.goBack();
  };

  componentWillUnmount() {
    this.didFocusSubscription && this.didFocusSubscription.remove();
    this.willBlurSubscription && this.willBlurSubscription.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
  }

  render() {
    return this.props.children || null;
  }
}

export const AndroidBackHandler = withNavigation(BackHandlerAndroid);
