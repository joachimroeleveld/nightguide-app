import React from 'react';
import { View, StyleSheet } from 'react-native';

import S from '../../config/styles';
import SearchBar from '../../components/SearchBar';

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
});
