import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import S from '../../config/styles';
import __ from '../../services/i18n';
import SearchBar from '../../components/SearchBar';
import Text from '../../components/Text';

class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  };

  toggleParentScreenCancel = this.props.navigation.getParam('toggleCancel');

  state = { showCancel: false, query: this.props.navigation.getParam('query') };

  componentDidMount() {
    this.addScreenEventListeners();
  }

  addScreenEventListeners = () => {
    this.onFocusListener = this.props.navigation.addListener('didFocus', () => {
      this.toggleParentScreenCancel();
      this.setState({ showCancel: true });
      this.onFocusListener.remove();
    });
    this.onBlurListener = this.props.navigation.addListener('didBlur', () => {
      this.toggleParentScreenCancel();
      this.onBlurListener.remove();
    });
  };

  onChangeQuery = query => {
    this.setState({ query });
  };

  onCancelPress = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          query={this.state.query}
          onChangeQuery={this.onChangeQuery}
          showCancel={this.state.showCancel}
          onCancelPress={this.onCancelPress}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{__('searchScreen.utrechtFirst')}</Text>
          <Text style={styles.text}>{__('searchScreen.moreSoon')}</Text>
        </View>
        <Image
          style={styles.fireworks}
          source={require('./img/fireworks.png')}
        />
      </View>
    );
  }
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: S.dimensions.screenOffset,
  },
  content: {
    paddingTop: 32,
  },
  title: {
    fontSize: 22,
    marginVertical: 12,
    fontWeight: '700',
    lineHeight: 26,
    width: '90%',
  },
  text: {
    fontSize: 16,
    width: '80%',
    marginVertical: 20,
  },
  fireworks: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
