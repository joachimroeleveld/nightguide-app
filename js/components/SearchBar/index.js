import React from 'react';
import {
  Animated,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

import __ from '../../services/i18n';
import S from '../../config/styles';
import Text from '../../components/Text';
import SmallButton from '../SmallButton';

const CANCEL_BUTTON_OFFSET_WIDTH = 74;

class SearchBar extends React.PureComponent {
  static propTypes = {
    onChangeQuery: PropTypes.func,
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
    onCancelPress: () => {},
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

  get inputShadowRadius() {
    return this.state.showCancel.interpolate({
      inputRange: [0, 1],
      outputRange: [5, 2],
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

  resetInputWidth = () => {
    this.forceUpdate();
  };

  onChangeText = query => this.props.onChangeQuery(query);

  onBlur = () => this.props.onBlur();

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableWithoutFeedback onPress={this.onContainerPress}>
          <Animated.View
            onLayout={this.resetInputWidth}
            style={[
              styles.inputContainer,
              { width: this.inputWidth, shadowRadius: this.inputShadowRadius },
            ]}
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
          </Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.cancelButtonContainer,
            { opacity: this.state.showCancel },
          ]}
        >
          <SmallButton
            onPress={this.props.onCancelPress}
            title={__('cancel')}
          />
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
    height: 45,
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
  cancelButtonContainer: {
    position: 'absolute',
    right: 0,
  },
});
