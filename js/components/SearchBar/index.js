import React from 'react';
import {
  Animated,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation, withNavigationFocus } from 'react-navigation';

import __ from '../../services/i18n';
import S from '../../config/styles';
import Text from '../../components/Text';
import SmallButton from '../SmallButton';

const CANCEL_BUTTON_OFFSET_WIDTH = 74;

class SearchBar extends React.PureComponent {
  static propTypes = {
    onCancelPress: PropTypes.func.isRequired,
    city: PropTypes.string.isRequired,
    onSubmit: PropTypes.func,
    onQueryChange: PropTypes.func,
    onFocus: PropTypes.func,
    query: PropTypes.string,
    focused: PropTypes.bool,
    focusElem: PropTypes.oneOf(['city', 'query']),
  };

  static defaultProps = {
    focused: false,
    focusElem: 'query',
    onQueryChange: () => {},
  };

  state = {
    initialQuery: this.props.query,
    focusAnim: new Animated.Value(this.props.focused ? 1 : 0),
    query: this.props.query || __('searchBar.lookForVenue'),
    cityIsFocused: this.props.focusElem === 'city',
    showInputResetIcon: new Animated.Value(0),
  };

  queryInput = null;
  cityInput = null;

  get inputWidth() {
    const screenWidth = Dimensions.get('window').width;
    const fullWidth = screenWidth - S.dimensions.screenOffset * 2;
    return this.state.focusAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [fullWidth, fullWidth - CANCEL_BUTTON_OFFSET_WIDTH],
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.focused !== prevProps.focused) {
      this.toggleFocused();
    }
  }

  toggleFocused = () => {
    if (this.props.focused) {
      this.setState({ initialQuery: this.props.query });
    }
    Animated.timing(this.state.focusAnim, {
      toValue: this.state.focusAnim._value === 1 ? 0 : 1,
      duration: 100,
    }).start(() => {
      if (this.props.focused) {
        const focusElem =
          this.props.focusElem === 'query' ? this.queryInput : this.cityInput;

        focusElem.focus();
      }
    });
  };

  onTextPress = () => {
    this.props.onFocus();
  };

  resetInputWidth = () => {
    this.forceUpdate();
  };

  onQueryChange = query => {
    const text = query && query.trim() ? query : null;
    this.setState({ query: text });
    this.props.onQueryChange(text);
  };

  onCityFocus = () => {
    this.cityInput.blur();
    if (!this.state.cityIsFocused) {
      this.props.navigation.navigate('City', {
        onCancelPress: this.onCancelPress,
      });
      this.queryInput.focus();
    }
    this.setState({
      cityIsFocused: true,
    });
  };

  onQueryFocus = () => {
    if (!this.state.cityIsFocused) {
      Animated.timing(this.state.showInputResetIcon, {
        toValue: 1,
        duration: 100,
      }).start();
    } else {
      // If current screen
      if (this.props.isFocused) {
        this.props.navigation.goBack();
      }
    }

    this.setState({
      cityIsFocused: false,
    });
  };

  onQueryBlur = () => {
    Animated.timing(this.state.showInputResetIcon, {
      toValue: 0,
      duration: 100,
    }).start();
  };

  onSubmit = () => {
    this.props.onSubmit(this.state.query);
  };

  onCancelPress = () => {
    if (this.state.cityIsFocused) {
      this.props.navigation.goBack();
    } else {
      this.setState({ query: this.state.initialQuery });
      this.onQueryChange(this.state.initialQuery);
    }
    this.props.onCancelPress();
  };

  resetQuery = () => {
    this.setState({ query: null });
    this.onSubmit();
  };

  resetQueryInput = () => {
    this.setState({ query: null });
    this.onQueryChange(null);
  };

  render() {
    return (
      <View
        style={[styles.container, this.props.style]}
        onLayout={this.props.onLayout}
      >
        <Animated.View
          onLayout={this.resetInputWidth}
          style={{ width: this.inputWidth }}
        >
          {!this.props.focused && (
            <View style={styles.textContainer}>
              <TouchableWithoutFeedback onPress={this.onTextPress}>
                <View style={styles.textBox}>
                  <Image
                    style={styles.searchIcon}
                    source={require('./img/search.png')}
                  />
                  <Text style={styles.queryText} numberOfLines={1}>
                    {this.props.query
                      ? `"${this.props.query}"`
                      : __('searchBar.allVenues')}
                  </Text>
                  <Text style={styles.inCityText}>{` ${__('searchBar.inCity', {
                    city: this.props.city,
                  })}`}</Text>
                </View>
              </TouchableWithoutFeedback>
              {!this.props.focused && !!this.props.query && (
                <TouchableOpacity
                  style={styles.resetSearch}
                  onPress={this.resetQuery}
                >
                  <Animated.Image
                    style={{
                      opacity: this.state.focusAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0],
                      }),
                    }}
                    source={require('../../img/input-reset.png')}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
          {this.props.focused && (
            <React.Fragment>
              <Animated.View
                style={[
                  styles.inputContainer,
                  styles.inputContainerQuery,
                  {
                    height: this.state.focusAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [45, 34],
                    }),
                    shadowRadius: this.state.focusAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [5, 2],
                    }),
                  },
                ]}
              >
                <Animated.View style={{ opacity: this.state.focusAnim }}>
                  <TextInput
                    style={[
                      styles.input,
                      styles.inputQuery,
                      this.state.cityIsFocused && styles.blurredInput,
                    ]}
                    ref={ref => (this.queryInput = ref)}
                    onChangeText={this.onQueryChange}
                    onFocus={this.onQueryFocus}
                    onBlur={this.onQueryBlur}
                    value={this.state.query}
                    blurOnSubmit={true}
                    onSubmitEditing={this.onSubmit}
                    returnKeyType={'search'}
                    selectTextOnFocus={!this.state.cityIsFocused}
                  />
                  <TouchableOpacity
                    style={styles.resetInput}
                    onPress={this.resetQueryInput}
                  >
                    <Animated.Image
                      style={{ opacity: this.state.showInputResetIcon }}
                      source={require('../../img/input-reset.png')}
                    />
                  </TouchableOpacity>
                </Animated.View>
              </Animated.View>
              <Animated.View
                style={[
                  styles.inputContainer,
                  {
                    height: this.state.focusAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 34],
                    }),
                    opacity: this.state.focusAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                ]}
              >
                <React.Fragment>
                  <Image
                    source={require('./img/location.png')}
                    style={styles.locationIcon}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      styles.inputCity,
                      !this.state.cityIsFocused && styles.blurredInput,
                    ]}
                    ref={ref => (this.cityInput = ref)}
                    onFocus={this.onCityFocus}
                    value={this.props.city}
                  />
                </React.Fragment>
              </Animated.View>
            </React.Fragment>
          )}
        </Animated.View>
        <Animated.View
          style={[
            styles.cancelContainer,
            { opacity: this.state.focusAnim },
          ]}
        >
          <SmallButton onPress={this.onCancelPress} title={__('cancel')} />
        </Animated.View>
      </View>
    );
  }
}

export default withNavigationFocus(withNavigation(SearchBar));

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  searchIcon: {
    marginHorizontal: 12,
  },
  cancelContainer: {
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
  },
  queryText: {
    fontSize: 15,
    flexShrink: 1,
  },
  inCityText: {
    fontSize: 15,
    color: S.colors.textSecondary,
    marginLeft: 5,
    flexGrow: 1,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#292929',
    height: 45,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
  },
  textBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    flexGrow: 1,
  },
  inputContainer: {
    backgroundColor: '#292929',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    height: 26,
    justifyContent: 'center',
  },
  inputContainerQuery: {
    marginBottom: 5,
  },
  input: {
    fontSize: 15,
    height: 34,
    paddingVertical: 2,
    paddingHorizontal: 12,
    color: '#fff',
  },
  inputCity: {
    paddingLeft: 33,
  },
  inputQuery: {
    paddingRight: 30,
  },
  blurredInput: {
    color: S.colors.textSecondary,
  },
  locationIcon: {
    position: 'absolute',
    left: 10,
  },
  resetInput: {
    zIndex: 1,
    position: 'absolute',
    height: '100%',
    paddingHorizontal: 10,
    right: 0,
    justifyContent: 'center',
  },
  resetSearch: {
    height: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});
