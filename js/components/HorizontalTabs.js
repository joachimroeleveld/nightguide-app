import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import S from '../config/styles';
import Text from './Text';

function HorizontalTabs(props) {
  const [currentKey, setCurrentKey] = useState(props.tabs[0].key);

  const onItemPress = key => {
    setCurrentKey(key);
  };

  return (
    <View style={[styles.container, props.style]}>
      <ScrollView contentContainerStyle={styles.tabs} horizontal={true}>
        {props.tabs.map((tab, index) => (
          <TouchableOpacity key={tab.key} onPress={() => onItemPress(tab.key)}>
            <Text
              style={[
                styles.tabTitle,
                tab.key === currentKey && styles.activeTabTitle,
                index === 0 && { paddingLeft: 0 },
                index === props.tabs.length - 1 && { paddingRight: 0 },
              ]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.content}>
        {props.tabs[_.findIndex(props.tabs, { key: currentKey })].content}
      </View>
    </View>
  );
}

HorizontalTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.element,
    })
  ).isRequired,
};

export default HorizontalTabs;

const styles = StyleSheet.create({
  container: {},
  tabs: {
    flexDirection: 'row',
  },
  content: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: S.colors.separatorColor,
    marginHorizontal: -S.dimensions.screenOffset,
    paddingHorizontal: S.dimensions.screenOffset,
  },
  tabTitle: {
    color: S.colors.textSecondary,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  activeTabTitle: {
    color: S.colors.textDefault,
  },
});
