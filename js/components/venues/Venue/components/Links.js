import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { CustomTabs } from 'react-native-custom-tabs';

import Text from '../../../Text';
import browser from '../../../../services/browser';

export default class VenueLinks extends React.PureComponent {
  static propTypes = {
    website: PropTypes.string,
    instagram: PropTypes.object,
    facebook: PropTypes.shape({
      id: PropTypes.string,
      pagesId: PropTypes.string,
    }),
  };

  get facebookUrl() {
    if (this.props.facebook && this.props.facebook.id) {
      return `https://www.facebook.com/${this.props.facebook.id}/`;
    }
    if (this.props.facebook && this.props.facebook.pagesId) {
      return `https://www.facebook.com/pages/${this.props.facebook.pagesId}/`;
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

  getOpenLink = _.memoize(href => () => {
    if (Platform.OS === 'android') {
      CustomTabs.openURL(href);
    } else {
      browser.openURL(href);
    }
  });

  render() {
    const Link = props => (
      <TouchableOpacity
        style={[styles.link, props.style]}
        onPress={this.getOpenLink(props.href)}
      >
        <Image
          style={styles.linkIcon}
          source={{
            uri: props.asset,
          }}
        />
        <Text style={styles.linkText}>{props.title}</Text>
      </TouchableOpacity>
    );

    return (
      <View style={styles.links}>
        {this.facebookUrl && (
          <Link href={this.facebookUrl} asset={'fb_icon'} title={'Facebook'} />
        )}
        {this.props.website && (
          <Link
            href={this.props.website}
            asset={'website_icon'}
            title={'Website'}
          />
        )}
        {this.instagramUrl && (
          <Link
            href={this.instagramUrl}
            asset={'instagram_icon'}
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
    width: 12,
    height: 12,
    marginRight: 8,
  },
});
