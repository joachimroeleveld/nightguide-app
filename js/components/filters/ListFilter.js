import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import FilterSection from './FilterSection';
import ToggleButton from '../buttons/ToggleButton';

export default function ListFilter({
  name,
  items,
  onChange,
  selectedItems,
  allowSingle,
}) {
  const [selected, setSelected] = useState(selectedItems || []);

  const onItemPress = key => {
    let newSelected;

    if (selected.includes(key)) {
      newSelected = _.without(selected, key);
    } else {
      if (allowSingle) {
        newSelected = [key];
      } else {
        newSelected = selectedItems.concat(key);
      }
    }
    setSelected(newSelected);
    onChange(newSelected);
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
              active={selected.includes(key)}
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
  selectedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
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
