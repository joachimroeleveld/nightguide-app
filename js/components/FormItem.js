import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';

import colors from '../config/styles/colors';

class FormItem extends React.PureComponent {
  static propTypes = {
    label: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  };

  render() {
    return (
      <View style={styles.container}>
        {!!this.props.label &&
          <Text style={styles.label}>{this.props.label.toUpperCase()}</Text>
        }
        <View style={styles.contents}>{this.props.children}</View>
      </View>
    );
  }
}

export default FormItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontWeight: '700',
    fontSize: 12,
    color: colors.textDefault,
    marginBottom: 6,
  },
  contents: {
  },
});
