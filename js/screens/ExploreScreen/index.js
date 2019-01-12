import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import S from '../../config/styles';
import SearchBar from '../../components/SearchBar';

class ExploreScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: <Image source={require('../../img/tabbar/explore.png')} />,
  };

  static TAGS = [

  ];

  state = { showSearchCancel: false };

  onSearchBarFocus = () => {
    this.props.navigation.navigate('Search', {
      query: 'Utrecht',
      toggleCancel: this.toggleCancel,
    });
  };

  toggleCancel = () =>
    this.setState({ showSearchCancel: !this.state.showSearchCancel });

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          showCancel={this.state.showSearchCancel}
          onFocus={this.onSearchBarFocus}
          query={'Utrecht'}
          style={styles.searchBar}
        />
      </View>
    );
  }
}

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: S.dimensions.screenOffset,
  },
  searchBar: {
    marginHorizontal: S.dimensions.screenOffset,
  },
});
