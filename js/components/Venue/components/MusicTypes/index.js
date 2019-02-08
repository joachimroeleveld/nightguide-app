import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withNavigationFocus } from 'react-navigation';

import S from '../../../../config/styles';
import Text from '../../../Text';
import Image from '../../../Image';
import __ from '../../../../services/i18n';

class VenueMusicTypes extends React.PureComponent {
  static propTypes = {
    types: PropTypes.arrayOf(PropTypes.string),
  };

  getImage = type => {
    switch (type) {
      case 'varying':
        return require('./img/varying.jpg');
      case 'jazz':
        return require('./img/jazz.jpg');
      case 'live':
        return require('./img/live.jpg');
      case 'dance':
        return require('./img/dance.jpg');
    }
  };

  render() {
    const types = this.props.types.slice(0, 3);
    const tileWidth =
      (Dimensions.get('window').width -
        2 * S.dimensions.screenOffset -
        (types.length - 1) * 10) /
      types.length;

    return (
      <View style={styles.container}>
        {types.map((type, index) => (
          <View
            key={type}
            style={[
              styles.tile,
              index === types.length - 1 && styles.lastTile,
              { width: tileWidth },
            ]}
          >
            <Image
              lazy={true}
              source={this.getImage(type)}
              style={[styles.image, { width: tileWidth }]}
            />
            <Text style={styles.tileTitle}>
              {__(`venue.musicTypes.${_.camelCase(type)}`)}
            </Text>
          </View>
        ))}
      </View>
    );
  }
}

export default withNavigationFocus(VenueMusicTypes);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  separator: {
    width: 10,
    height: 112,
  },
  image: {
    position: 'absolute',
  },
  tile: {
    marginRight: 10,
    height: 112,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: S.colors.tileBackgroundColor,
  },
  lastTile: {
    marginRight: 0,
  },
  tileTitle: {
    position: 'absolute',
    fontSize: 14,
  },
});
