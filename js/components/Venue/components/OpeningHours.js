import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import __ from '../../../services/i18n';
import Text from '../../Text';
import S from '../../../config/styles';
import { getDayScheduleParsed, checkIsOpenFromSchedule } from '../util';
import Image from '../../Image';

const MOMENT_TIME_FORMAT = 'H:mm';

class VenueOpeningHours extends React.PureComponent {
  static propTypes = {
    city: PropTypes.string.isRequired,
    schedule: PropTypes.object.isRequired,
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
      const daySchedule = getDayScheduleParsed(this.props.schedule, dayOffset);
      if (daySchedule && daySchedule.from) {
        return daySchedule.from;
      }
      return null;
    }, null);
  }

  get openText() {
    if (this.isOpen) {
      return __('venue.openUntilTime', {
        time: this.todayScheduleParsed.to.format(MOMENT_TIME_FORMAT),
      });
    }

    const nextOpenMoment = this.nextOpenMoment;
    if (nextOpenMoment) {
      let openAt;
      if (nextOpenMoment.isSame(moment(), 'day')) {
        openAt = nextOpenMoment.format(MOMENT_TIME_FORMAT);
      } else {
        openAt = nextOpenMoment.format(`ddd ${MOMENT_TIME_FORMAT}`);
      }

      return __('venue.openAt', { date: openAt });
    }
    return null;
  }

  render() {
    const openText = this.openText;

    if (!openText) {
      return null;
    }

    return (
      <View style={[styles.container, this.props.style]}>
        {this.isOpen && (
          <Image
            style={styles.openIndicator}
            source={require('../../../img/open_indicator.png')}
          />
        )}
        <Text>{openText}</Text>
      </View>
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
