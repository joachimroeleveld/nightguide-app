import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import S from '../config/styles';

class Header extends React.PureComponent {
  static propTypes = {
    absolute: PropTypes.bool,
  };

  render() {
    return (
      <React.Fragment>
        <View
          style={[
            styles.container,
            this.props.absolute && styles.absoluteContainer,
            this.props.style,
          ]}
        >
          {this.props.children}
        </View>
        {this.props.absolute && <View style={styles.absoluteSpacer} />}
      </React.Fragment>
    );
  }
}

export default Header;

const styles = StyleSheet.create({
  container: {
  },
  absoluteContainer: {
    height: S.dimensions.screenOffset + S.dimensions.headerHeight + 10,
    width: '100%',
    position: 'absolute',
    paddingTop: S.dimensions.screenOffset,
    paddingHorizontal: S.dimensions.screenOffset,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: S.colors.sectionBorderColor,
    backgroundColor: S.colors.defaultScreenColor,
    zIndex: 10,
  },
  absoluteSpacer: {
    height: S.dimensions.headerHeight + S.dimensions.screenOffset,
  },
});
