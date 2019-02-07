import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Text from '../../Text';
import browser from '../../../services/browser';

export default class VenueLinks extends React.PureComponent {
  static propTypes = {
    website: PropTypes.string,
    instagram: PropTypes.object,
    facebook: PropTypes.object,
  };

  get facebookUrl() {
    if (this.props.facebook && this.props.facebook.id) {
      return `https://www.facebook.com/${this.props.facebook.id}/`;
    }
    return null;
  }

  get instagramUrl() {
    if (this.props.instagram) {
      if (this.props.instagram.id) {
        return `https://www.instagram.com/${this.props.instagram.id}`;
      }
      if (this.props.instagram.explorePage) {
        return this.props.instagram.explorePage;
      }
    }
    return null;
  }

  getOpenLink = _.memoize(href => () => browser.openUrl(href));

  render() {
    const Link = props => (
      <TouchableOpacity
        style={[styles.link, props.style]}
        onPress={this.getOpenLink(props.href)}
      >
        <Image style={styles.linkIcon} source={props.iconSrc} />
        <Text style={styles.linkText}>{props.title}</Text>
      </TouchableOpacity>
    );

    return (
      <View style={styles.links}>
        {this.facebookUrl && (
          <Link
            href={this.facebookUrl}
            iconSrc={require('../img/fb-icon.png')}
            title={'Facebook'}
          />
        )}
        {this.props.website && (
          <Link
            href={this.props.website}
            iconSrc={require('../img/website-icon.png')}
            title={'Website'}
          />
        )}
        {this.instagramUrl && (
          <Link
            href={this.instagramUrl}
            iconSrc={require('../img/instagram-icon.png')}
            title={'Instagram'}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  links: {
    flexDirection: 'row',
    marginVertical: 14,
  },
  link: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 18,
  },
  linkText: {
    fontSize: 13,
  },
  instagramLink: {
    marginRight: 0,
  },
  linkIcon: {
    marginRight: 8,
  },
});
