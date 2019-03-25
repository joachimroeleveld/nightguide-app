import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import __ from '../../../services/i18n';
import Text from '../../Text';
import S from '../../../config/styles';
import {
  getDayScheduleParsed,
  checkIsOpenFromSchedule,
  TIME_FORMAT,
} from '../util';
import Image from '../../Image';

class VenueOpeningHours extends React.PureComponent {
  static propTypes = {
    city: PropTypes.string.isRequired,
    schedule: PropTypes.object.isRequired,
    toggleModalCallback: PropTypes.func,
  };

  get todayScheduleParsed() {
    return getDayScheduleParsed(this.props.schedule);
  }

  get isOpen() {
    return checkIsOpenFromSchedule(this.props.schedule);
  }

  get nextOpenMoment() {
    return _.range(1, 8).reduce((openMoment, dayOffset) => {
      if (openMoment) {
        return openMoment;
      }
      const daySchedule = getDayScheduleParsed(
        this.props.schedule,
        true,
        dayOffset
      );
      if (daySchedule) {
        return daySchedule.from;
      }
      return null;
    }, null);
  }

  get openText() {
    if (this.isOpen) {
      return __('venueScreen.openUntilTime', {
        time: this.todayScheduleParsed.to.format(TIME_FORMAT),
      });
    }

    const nextOpenMoment = this.nextOpenMoment;
    if (nextOpenMoment) {
      if (nextOpenMoment.isSame(moment(), 'day')) {
        const date = nextOpenMoment.format(TIME_FORMAT);
        return __('venueScreen.opensAt', { date });
      } else {
        const date = nextOpenMoment.format(`ddd, ${TIME_FORMAT}`);
        return __('venueScreen.opensOn', { date });
      }
    }
    return null;
  }

  render() {
    const openText = this.openText;

    if (!openText) {
      return null;
    }

    return (
      <TouchableOpacity onPress={this.props.toggleModalCallback}>
        <View style={[styles.container, this.props.style]}>
          {this.isOpen && (
            <Image
              style={styles.openIndicator}
              source={require('../../../img/open_indicator.png')}
            />
          )}
          <Text>{openText}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default VenueOpeningHours;

const styles = StyleSheet.create({
  container: {
    backgroundColor: S.colors.elevatedBgColor,
    borderRadius: 3,
    paddingHorizontal: 12,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  openIndicator: {
    marginRight: 8,
    marginLeft: -1,
  },
});
