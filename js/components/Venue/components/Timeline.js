import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import _ from 'lodash';
import moment from 'moment';

import HorizontalTabs from '../../HorizontalTabs';
import { getDayKey, getDayScheduleParsed, TIME_FORMAT } from '../util';
import Text from '../../Text';
import __ from '../../../services/i18n';

const TIMELINE_ITEMS = [
  { key: 'open', isRange: true },
  { key: 'terrace', isRange: true },
  { key: 'kitchen', isRange: true },
  // { key: 'drinksFrom' },
  { key: 'busyFrom' },
  { key: 'dancingFrom' },
  { key: 'bitesUntil' },
];

function VenueTimeline(props) {
  const renderDay = daySchedule => {
    const closed = !daySchedule.open;

    const items = TIMELINE_ITEMS.map(({ key, isRange }) => {
      const value = daySchedule[key];

      if (key !== 'open' && (closed || !value)) return null;

      let time;
      if (closed) {
        time = '-';
      } else if (isRange) {
        const fromTime = value.from.format(TIME_FORMAT);
        const toTime = value.to.format(TIME_FORMAT);
        time = `${fromTime}-${toTime}`;
      } else {
        time = value.format(TIME_FORMAT);
      }

      return (
        <View key={key} style={styles.item}>
          <Text style={styles.itemLeft}>
            {__(`venue.timelineItems.${key}`)}
          </Text>
          <Text style={styles.itemRight}>{time}</Text>
        </View>
      );
    });
    return <View style={styles.items}>{items}</View>;
  };

  const tabs = _.range(0, 7).map((tabs, dayOffset) => {
    const dayKey = getDayKey(dayOffset);
    const dayTitle = moment()
      .add(dayOffset, 'days')
      .format('ddd');

    const daySchedule = TIMELINE_ITEMS.reduce((daySchedule, item) => {
      if (!props.schedule[item.key]) {
        return daySchedule;
      }
      return {
        ...daySchedule,
        [item.key]: getDayScheduleParsed(
          props.schedule[item.key],
          !!item.isRange,
          dayOffset
        ),
      };
    }, {});
    const content = renderDay(daySchedule);

    return {
      key: dayKey,
      title: dayTitle,
      content,
    };
  });

  return <HorizontalTabs style={styles.container} tabs={tabs} />;
}

VenueTimeline.propTypes = {
  schedule: PropTypes.object.isRequired,
};

export default VenueTimeline;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  items: {
    paddingTop: 10,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 6,
  },
  itemLeft: {
    flexGrow: 1,
  },
  itemRight: {},
});
