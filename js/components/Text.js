import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

import { colors } from '../config/styleVars';

class Text extends React.PureComponent {
  render() {
    return (
      <RNText {...this.props} style={styles.text}>
        {this.props.children}
      </RNText>
    );
  }
}

export default Text;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'NotoSans',
    fontSize: 17,
    color: colors.textDefault,
  },
});
