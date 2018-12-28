import React from 'react';
import {
  Animated,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

import __ from '../../services/i18n';
import S from '../../config/styles';
import Text from '../../components/Text';

const CANCEL_BUTTON_OFFSET_WIDTH = 78;

class SearchBar extends React.PureComponent {
  static propTypes = {
    onChangeQuery: PropTypes.func.required,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    query: PropTypes.string,
    onCancelPress: PropTypes.func,
    showCancel: PropTypes.bool,
  };

  static defaultProps = {
    showCancel: false,
    onFocus: () => {},
    onBlur: () => {},
  };

  state = {
    showCancel: new Animated.Value(this.props.showCancel ? 1 : 0),
  };

  get inputWidth() {
    const screenWidth = Dimensions.get('window').width;
    const fullWidth = screenWidth - S.dimensions.screenOffset * 2;
    return this.state.showCancel.interpolate({
      inputRange: [0, 1],
      outputRange: [fullWidth, fullWidth - CANCEL_BUTTON_OFFSET_WIDTH],
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.showCancel !== prevProps.showSearchCancel) {
      this.toggleCancel();
    }
  }

  toggleCancel = () => {
    Animated.timing(this.state.showCancel, {
      toValue: this.state.showCancel._value === 1 ? 0 : 1,
      duration: 100,
    }).start();
  };

  onContainerPress = () => {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  onChangeText = query => this.props.onChangeQuery(query);

  onBlur = () => this.props.onBlur();

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={{ width: this.inputWidth }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={this.onContainerPress}
            style={[styles.inputContainer, this.props.style]}
          >
            <Image
              style={styles.searchIcon}
              source={require('./img/search.png')}
            />
            {this.props.onFocus && <Text>{`"${this.props.query}"`}</Text>}
            {!this.props.onFocus && (
              <TextInput
                onChangeText={this.onChangeText}
                onBlur={this.onBlur}
                val={this.props.query}
              />
            )}
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.cancelButtonContainer,
            { opacity: this.state.showCancel },
          ]}
        >
          <TouchableOpacity
            onPress={this.props.onCancelPress}
            style={styles.cancelButton}
          >
            <Text style={this.cancelButton}>{__('cancel')}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#292929',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
  },
  searchIcon: {
    marginHorizontal: 12,
  },
  cancelButton: {
    color: '#BEBEBE',
    borderColor: '#4F4F4F',
    borderWidth: 1,
    borderRadius: 4,
    marginLeft: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cancelButtonContainer: {
    position: 'absolute',
    right: 0,
  },
});
