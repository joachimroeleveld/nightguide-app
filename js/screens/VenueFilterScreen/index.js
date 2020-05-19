import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  VENUE_CATEGORIES,
  VENUE_DOORPOLICIES,
  VENUE_DRESSCODES,
  VENUE_MUSIC_TYPES,
  VENUE_PAYMENT_METHODS,
  VENUE_VISITOR_TYPES,
} from '../../config/venueConstants';
import __ from '../../services/i18n';
import S from '../../config/styles';
import HeaderBackButton from '../../components/header/HeaderBackButton';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import { LongListFilterPreview } from '../../components/filters/LongListFilter';
import FilterSection from '../../components/filters/FilterSection';
import BooleanFilter from '../../components/filters/BooleanFilter';
import BigButton from '../../components/buttons/BigButton';
import ListFilter from '../../components/filters/ListFilter';
import { createDeepEqualSelector } from '../../services/util';
import { getUserCurrencySymbol } from '../../services/currencies';

const FACILITY_FILTERS = ['cigarettes', 'terrace', 'noEntranceFee', 'kitchen'];
const OTHER_FILTERS = [
  'smokingArea',
  'terraceHeaters',
  'bouncers',
  'noBouncers',
  'coatCheck',
  'noCoatCheckFee',
  'vipArea',
  'parking',
  'accessible',
];

const categoryItems = Object.values(VENUE_CATEGORIES).map(item => ({
  key: item,
  label: __(`venue.categories.${_.camelCase(item)}`),
}));
const musicTypeItems = Object.values(VENUE_MUSIC_TYPES).map(item => ({
  key: item,
  label: __(`venue.musicTypes.${_.camelCase(item)}`),
}));
const dresscodeItems = [{ key: 'none', label: __('none') }].concat(
  Object.values(VENUE_DRESSCODES).map(item => ({
    key: item,
    label: __(`venue.dresscodes.${_.camelCase(item)}`),
  }))
);
const paymentMethodItems = Object.values(VENUE_PAYMENT_METHODS).map(item => ({
  key: item,
  label: __(`venue.paymentMethods.${_.camelCase(item)}`),
}));
const otherFilterItems = OTHER_FILTERS.map(item => ({
  key: item,
  label: __(`venueFilterScreen.${_.camelCase(item)}`),
}));
const visitorTypeItems = Object.values(VENUE_VISITOR_TYPES).map(item => ({
  key: item,
  label: __(`venue.visitorTypes.${_.camelCase(item)}`),
}));
const doorPolicyItems = [{ key: 'none', label: __('none') }].concat(
  Object.values(VENUE_DOORPOLICIES).map(item => ({
    key: item,
    label: __(`venue.doorPolicies.${_.camelCase(item)}`),
  }))
);
const priceClassItems = _.range(1, 5).map(priceClass => ({
  key: priceClass.toString(),
  label: getUserCurrencySymbol().repeat(priceClass),
}));
const capacityRangeItems = [
  '1-50',
  '50-200',
  '200-500',
  '500-1000',
  '5000-10.000',
  '10.000+',
].map((label, index) => ({
  key: String(index + 1),
  label,
}));

const getBooleanFilters = createDeepEqualSelector(
  (filters, keys) => _.pick(filters, keys),
  filters =>
    _(filters)
      .omitBy(val => val === false)
      .keys()
      .value()
);

VenueFilterScreen.navigationOptions = ({ navigation }) => ({
  title: __('venueFilterScreen.filters'),
  headerRight: (
    <HeaderRightButton
      onPress={navigation.getParam('clearAll')}
      title={__('clearAll')}
    />
  ),
  headerLeft: (
    <HeaderBackButton variant={'close'} onPress={() => navigation.dismiss()} />
  ),
});

function VenueFilterScreen({
  navigation,
  currentFilters = {},
  venueCount,
  isFetching,
}) {
  const filterVenues = navigation.getParam('filterVenues');

  useEffect(() => {
    navigation.setParams({ clearAll });
  }, []);

  const [filters, setFilters] = useState(currentFilters);

  const applyFilter = filter => {
    const newFilters = Object.assign(currentFilters, filter);
    setFilters(newFilters);
    filterVenues(
      _.omitBy(newFilters, val => !val || (Array.isArray(val) && !val.length))
    );
  };

  const clearAll = () => {
    filterVenues({});
    setFilters({});
  };

  const onFilterChange = _.memoize(filterName => val => {
    applyFilter({ [filterName]: val });
  });

  const onTimeFilterChange = _.memoize(timeFilter => value => {
    let filterVal;
    if (value) {
      filterVal = new Date().toISOString();
    } else {
      filterVal = null;
    }
    applyFilter({ [timeFilter]: filterVal });
  });

  const onOtherFiltersChange = otherFilters => {
    applyFilter(
      OTHER_FILTERS.reduce(
        (acc, filter) => ({ ...acc, [filter]: otherFilters.includes(filter) }),
        {}
      )
    );
  };

  const openCategoryFilter = () => {
    navigation.navigate('VenueFilterList', {
      title: __('venueFilterScreen.categories'),
      items: categoryItems,
      onChange: onFilterChange('cat'),
      selectedItems: filters.cat,
    });
  };

  const openMusicTypesFilter = () => {
    navigation.navigate('VenueFilterList', {
      title: __('venueFilterScreen.musicTypes'),
      items: musicTypeItems,
      onChange: onFilterChange('musicType'),
      selectedItems: filters.musicType,
    });
  };

  const openOtherFilters = () => {
    navigation.navigate('VenueFilterList', {
      title: __('venueFilterScreen.otherOptions'),
      items: otherFilterItems,
      onChange: onOtherFiltersChange,
      selectedItems: otherFilters,
    });
  };

  const openVisitorTypeFilter = () => {
    navigation.navigate('VenueFilterList', {
      title: __('venueFilterScreen.visitorTypes'),
      items: visitorTypeItems,
      onChange: onFilterChange('visitorType'),
      selectedItems: filters.visitorType,
    });
  };

  const submit = () => navigation.dismiss();

  const facilityFilters = getBooleanFilters(filters, FACILITY_FILTERS);
  const otherFilters = getBooleanFilters(filters, OTHER_FILTERS);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <LongListFilterPreview
          style={styles.categories}
          name={__('venueFilterScreen.categories')}
          items={categoryItems}
          selectedItems={filters.cat}
          onPress={openCategoryFilter}
        />
        <FilterSection title={__('venueFilterScreen.timeline')}>
          <BooleanFilter
            label={__('venueFilterScreen.nowOpen')}
            onValueChange={onTimeFilterChange('openTime')}
            value={!!filters.openTime}
          />
          <BooleanFilter
            label={__('venueFilterScreen.nowBusy')}
            onValueChange={onTimeFilterChange('busyTime')}
            value={!!filters.busyTime}
          />
          <BooleanFilter
            label={__('venueFilterScreen.nowDancing')}
            onValueChange={onTimeFilterChange('dancingTime')}
            value={!!filters.dancingTime}
          />
          <BooleanFilter
            label={__('venueFilterScreen.terraceOpen')}
            onValueChange={onTimeFilterChange('terraceTime')}
            value={!!filters.terraceTime}
          />
          <BooleanFilter
            label={__('venueFilterScreen.kitchenOpen')}
            onValueChange={onTimeFilterChange('kitchenTime')}
            value={!!filters.kitchenTime}
          />
          <BooleanFilter
            label={__('venueFilterScreen.bitesAvailable')}
            onValueChange={onTimeFilterChange('bitesTime')}
            value={!!filters.bitesTime}
          />
        </FilterSection>
        <LongListFilterPreview
          name={__('venueFilterScreen.musicTypes')}
          items={musicTypeItems}
          selectedItems={filters.musicType}
          onPress={openMusicTypesFilter}
        />
        <FilterSection title={__('venueFilterScreen.facilities')}>
          {FACILITY_FILTERS.map(facility => (
            <BooleanFilter
              key={facility}
              label={__(`venueFilterScreen.${facility}`)}
              onValueChange={onFilterChange(facility)}
              value={facilityFilters.includes(facility)}
            />
          ))}
        </FilterSection>
        <ListFilter
          name={__('venueFilterScreen.priceClass')}
          items={priceClassItems}
          selectedItems={filters.priceClass}
          onChange={onFilterChange('priceClass')}
        />
        <LongListFilterPreview
          name={__('venueFilterScreen.visitorTypes')}
          items={visitorTypeItems}
          selectedItems={filters.visitorType}
          onPress={openVisitorTypeFilter}
        />
        <ListFilter
          items={paymentMethodItems}
          selectedItems={filters.paymentMethod}
          onChange={onFilterChange('paymentMethod')}
          name={__('venueFilterScreen.paymentMethods')}
        />
        <ListFilter
          items={dresscodeItems}
          selectedItems={filters.dresscode}
          onChange={onFilterChange('dresscode')}
          name={__('venueFilterScreen.dresscode')}
        />
        <ListFilter
          name={__('venueFilterScreen.doorPolicy')}
          items={doorPolicyItems}
          selectedItems={filters.doorPolicy}
          onChange={onFilterChange('doorPolicy')}
        />
        <ListFilter
          name={__('venueFilterScreen.capacity')}
          items={capacityRangeItems}
          selectedItems={filters.capRange}
          onChange={onFilterChange('capRange')}
        />
        <LongListFilterPreview
          style={styles.otherOptions}
          name={__('venueFilterScreen.otherOptions')}
          items={otherFilterItems}
          selectedItems={otherFilters}
          onPress={openOtherFilters}
        />
      </ScrollView>
      <View style={styles.submitContainer}>
        <BigButton
          style={[S.buttons.whiteButton, styles.submitButton]}
          darkTitle={true}
          onPress={submit}
          loading={isFetching}
          title={__('venueFilterScreen.showVenues', { count: venueCount })}
        />
      </View>
    </View>
  );
}

const mapStateToProps = state => ({
  currentFilters: state.venues.list.filter,
  venueCount: state.venues.list.totalCount,
  isFetching: state.venues.list.isFetching,
});

export default connect(mapStateToProps)(VenueFilterScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7,
  },
  contentContainer: {
    paddingBottom: 90,
  },
  categories: {},
  submitContainer: {
    backgroundColor: S.colors.defaultScreenColor,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: S.dimensions.screenOffset,
    paddingTop: 4,
    paddingBottom: S.dimensions.screenOffset,
  },
  submitButton: {
    width: '100%',
  },
  otherOptions: {
    borderBottomWidth: 0,
  },
});
