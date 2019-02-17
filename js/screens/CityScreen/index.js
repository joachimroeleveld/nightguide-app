import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import S from '../../config/styles';
import __ from '../../services/i18n';
import SearchBar from '../../components/SearchBar';
import Text from '../../components/Text';
import Title from '../../components/Title';

class CityScreen extends React.Component {
  static navigationOptions = {
    gesturesEnabled: false,
  };

  onCancelPress = this.props.navigation.getParam('onCancelPress');

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          query={this.props.query}
          city={this.props.city}
          onCancelPress={this.onCancelPress}
          focused={true}
          focusElem={'city'}
        />
        <View style={styles.content}>
          <Title style={styles.title}>{__('searchScreen.utrechtFirst')}</Title>
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

const mapStateToProps = state => ({
  city: state.venues.city,
  query: state.venues.list.query,
});

export default connect(
  mapStateToProps,
)(CityScreen);

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
    marginBottom: 14,
  },
  text: {
    fontSize: 16,
    width: '80%',
    marginVertical: 20,
  },
  fireworks: {
    position: 'absolute',
    opacity: 0.8,
    bottom: -S.dimensions.screenOffset,
    right: -S.dimensions.screenOffset,
  },
});
