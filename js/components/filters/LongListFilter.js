import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';

import __ from '../../services/i18n';
import S from '../../config/styles';
import Text from '../Text';
import HeaderBackButton from '../../components/header/HeaderBackButton';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import BooleanFilter from './BooleanFilter';
import FilterSection from './FilterSection';
import FilterTitle from './FilterTitle';

LongListFilterScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title'),
  headerLeft: <HeaderBackButton onPress={() => navigation.goBack()} />,
  headerRight: (
    <HeaderRightButton
      onPress={navigation.getParam('clearAll')}
      title={__('clearAll')}
    />
  ),
});

export function LongListFilterScreen({ navigation }) {
  const title = navigation.getParam('title');
  const items = navigation.getParam('items');
  const onChange = navigation.getParam('onChange');
  const selectedItems = navigation.getParam('selectedItems');

  const [selected, setSelected] = useState(selectedItems || []);

  useEffect(() => {
    navigation.setParams({ title, clearAll });
  }, []);

  const clearAll = () => {
    onChange([]);
    setSelected([]);
  };

  const onItemPress = key => {
    let newSelected;
    if (selected.includes(key)) {
      newSelected = _.without(selected, key);
    } else {
      newSelected = selected.concat(key);
    }
    setSelected(newSelected);
    onChange(newSelected);
  };

  return (
    <View style={styles.screenContainer}>
      <LongListFilterList
        items={items}
        selectedItems={selected}
        onItemPress={onItemPress}
      />
    </View>
  );
}

function LongListFilterList({ items, selectedItems, onItemPress }) {
  const renderItem = ({ item, index }) => (
    <BooleanFilter
      style={[[styles.row, index === items.length - 1 && styles.lastRow]]}
      label={item.label}
      value={selectedItems.includes(item.key)}
      onValueChange={() => onItemPress(item.key)}
    />
  );
  return (
    <FlatList extraData={selectedItems} data={items} renderItem={renderItem} />
  );
}

export function LongListFilterPreview({
  name,
  items,
  selectedItems,
  onPress,
  style,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <FilterSection style={[styles.preview, style]}>
        <View style={styles.previewText}>
          <FilterTitle style={styles.previewLabel} title={name} />
          <Text numberOfLines={1} ellepsisMode={'tail'}>
            {!selectedItems.length && '-'}
            {!!selectedItems.length &&
              selectedItems.map(key => _.find(items, { key }).label).join(', ')}
          </Text>
        </View>
        <Image source={require('./img/descend.png')} />
      </FilterSection>
    </TouchableOpacity>
  );
}

LongListFilterPreview.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingVertical: S.dimensions.screenOffset,
  },
  row: {
    paddingHorizontal: S.dimensions.screenOffset,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: S.colors.separatorColor,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  preview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewText: {
    flexGrow: 1,
    paddingRight: 8,
  },
});
