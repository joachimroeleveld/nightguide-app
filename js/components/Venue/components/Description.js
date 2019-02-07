import React from 'react';
import { TouchableOpacity, StyleSheet, View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import TextSize from 'react-native-text-size';

import Text from '../../Text';
import S from '../../../config/styles';
import __ from '../../../services/i18n';

export default class VenueDescription extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  state = {
    lineCount: 0,
    expanded: false,
  };

  async componentDidMount() {
    const width = Math.round(
      Dimensions.get('window').width - 2 * S.dimensions.screenOffset
    );
    const { lineCount } = await TextSize.measure({
      text: this.props.text,
      width,
      fontFamily: 'Noto Sans',
      fontSize: 14,
    });
    this.setState({
      lineCount,
    });
  }

  toggleExpanded = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  render() {
    if (this.state.height) {
      return null;
    }

    const Toggle = props => (
      <TouchableOpacity style={styles.toggle} onPress={props.handler}>
        <Text style={styles.toggleText}>
          {'...' + props.text.toLowerCase()}
        </Text>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <View>
          <Text
            numberOfLines={this.state.expanded ? null : 2}
            style={styles.text}
          >
            {this.props.text}
          </Text>
          {this.state.lineCount > 2 && !this.state.expanded && (
            <Toggle handler={this.toggleExpanded} text={__('readMore')} />
          )}
          {this.state.lineCount > 2 && this.state.expanded && (
            <Toggle handler={this.toggleExpanded} text={__('readLess')} />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: S.colors.defaultScreenColorDarker,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: S.colors.separatorColor,
    marginHorizontal: -S.dimensions.screenOffset,
    paddingHorizontal: S.dimensions.screenOffset,
    paddingVertical: 20,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
  },
  toggle: {
    marginTop: 4,
  },
  toggleText: {
    color: S.colors.linkColor,
    fontSize: 13,
  },
});
