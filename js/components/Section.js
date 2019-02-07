import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import S from '../config/styles';
import Text from './Text';

class Section extends React.PureComponent {
  static propTypes = {
    border: PropTypes.oneOf(['top', 'bottom', 'none']),
    padding: PropTypes.oneOf(['top', 'bottom', 'none']),
    title: PropTypes.string,
  };

  render() {
    let borderStyle;
    switch (this.props.border) {
      case 'none':
        borderStyle = styles.borderNone;
        break;
      case 'top':
        borderStyle = styles.borderTop;
        break;
      default:
        borderStyle = styles.borderBottom;
    }

    let padding;
    switch (this.props.padding) {
      case 'none':
        padding = styles.paddingNone;
        break;
      case 'top':
        padding = styles.paddingTop;
        break;
      case 'bottom':
        padding = styles.paddingBottom;
        break;
      default:
        padding = styles.paddingBoth;
    }
    return (
      <View style={[styles.section, borderStyle, padding, this.props.styles]}>
        {!!this.props.title && (
          <Text style={styles.title}>{this.props.title}</Text>
        )}
        {this.props.children}
      </View>
    );
  }
}

export default Section;

const styles = StyleSheet.create({
  section: {
    marginHorizontal: -S.dimensions.screenOffset,
    paddingHorizontal: S.dimensions.screenOffset,
    borderColor: S.colors.sectionBorderColor,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 16,
  },
  borderTop: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  borderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  borderNone: {
    borderWidth: 0,
  },
  paddingBoth: {
    paddingVertical: S.dimensions.sectionVPadding,
  },
  paddingTop: {
    paddingTop: S.dimensions.sectionVPadding,
  },
  paddingBottom: {
    paddingBottom: S.dimensions.sectionVPadding,
  },
  paddingNone: {
    padding: 0,
  },
});
