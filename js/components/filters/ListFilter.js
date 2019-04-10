import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import FilterSection from './FilterSection';
import ToggleButton from '../buttons/ToggleButton';

export default function ListFilter({
  name,
  items,
  onChange,
  selectedItems = [],
  allowSingle,
}) {
  const onItemPress = key => {
    let newVal;
    if (!allowSingle) {
      newVal = !selectedItems.includes(key);
      onChange(
        newVal ? selectedItems.concat(key) : _.without(selectedItems, key)
      );
    } else {
      newVal = selectedItems !== key;
      onChange(newVal ? key : null);
    }
  };

  return (
    <FilterSection title={name}>
      <ScrollView contentContainerStyle={styles.container} horizontal={true}>
        {!!items.length &&
          items.map(({ key, label }, index) => (
            <ToggleButton
              style={[
                styles.item,
                index === items.length - 1 && styles.lastItem,
              ]}
              key={key}
              onPress={() => onItemPress(key)}
              title={label}
              active={
                allowSingle
                  ? selectedItems === key
                  : selectedItems.includes(key)
              }
            />
          ))}
      </ScrollView>
    </FilterSection>
  );
}

ListFilter.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  selectedItems: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  allowSingle: PropTypes.bool,
};

const styles = StyleSheet.create({
  item: {
    marginRight: 8,
  },
  lastItem: {
    marginRight: 0,
  },
  container: {
    marginVertical: 6,
  },
});
