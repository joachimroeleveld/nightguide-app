import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  VENUE_CATEGORIES,
  VENUE_DRESSCODES,
  VENUE_MUSIC_TYPES,
  VENUE_PAYMENT_METHODS,
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
const dresscodeItems = Object.values(VENUE_DRESSCODES).map(item => ({
  key: item,
  label: __(`venue.dresscodes.${_.camelCase(item)}`),
}));
const paymentMethodItems = Object.values(VENUE_PAYMENT_METHODS).map(item => ({
  key: item,
  label: __(`venue.paymentMethods.${_.camelCase(item)}`),
}));
const otherFilterItems = OTHER_FILTERS.map(item => ({
  key: item,
  label: __(`venueFilterScreen.${_.camelCase(item)}`),
}));

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

  const [categories, setCategories] = useState(currentFilters.cat || []);
  const [musicTypes, setMusicTypes] = useState(currentFilters.musicType || []);
  const [dresscode, setDresscode] = useState(currentFilters.dresscode || []);
  const [facilityFilters, setFacilityFilters] = useState(
    _(currentFilters)
      .pick(FACILITY_FILTERS)
      .omitBy(val => val !== undefined)
      .keys()
      .value()
  );
  const [otherFilters, setOtherFilters] = useState(
    _(currentFilters)
      .pick(OTHER_FILTERS)
      .omitBy(val => val !== undefined)
      .keys()
      .value()
  );
  const [paymentMethods, setPaymentMethods] = useState(
    currentFilters.paymentMethod || []
  );
  const [timeFilters, setTimeFilters] = useState({
    dancingTime: currentFilters.dancingTime,
    openTime: currentFilters.openTime,
    busyTime: currentFilters.busyTime,
    terraceTime: currentFilters.terraceTime,
  });

  const applyFilter = filter =>
    filterVenues(
      _.omitBy(
        {
          ...currentFilters,
          ...filter,
        },
        val => !val || (Array.isArray(val) && !val.length)
      )
    );

  const clearAll = () => {
    filterVenues({});
    setCategories([]);
    setMusicTypes([]);
    setDresscode([]);
    setFacilityFilters([]);
    setOtherFilters([]);
    setPaymentMethods([]);
    setTimeFilters({});
  };

  const onTimeFilterChange = _.memoize(timeFilter => value => {
    let filterVal;
    if (value) {
      filterVal = new Date().toISOString();
    } else {
      filterVal = null;
    }
    setTimeFilters({
      ...timeFilters,
      [timeFilter]: filterVal,
    });
    applyFilter({ [timeFilter]: filterVal });
  });

  const onCategoriesChange = categories => {
    setCategories(categories);
    applyFilter({ cat: categories });
  };

  const onMusicTypesChange = musicTypes => {
    setMusicTypes(musicTypes);
    applyFilter({ musicType: musicTypes });
  };

  const onDresscodeChange = dresscode => {
    setDresscode(dresscode);
    applyFilter({ dresscode });
  };

  const onPaymentMethodChange = paymentMethods => {
    setPaymentMethods(paymentMethods);
    applyFilter({ paymentMethod: paymentMethods });
  };

  const onFacilityFilterChange = _.memoize(filter => val => {
    if (val) {
      setFacilityFilters(facilityFilters.concat(filter));
    } else {
      setFacilityFilters(_.without(facilityFilters, filter));
    }
    applyFilter({ [filter]: val });
  });

  const onOtherFiltersChange = otherFilters => {
    setOtherFilters(otherFilters);
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
      onChange: onCategoriesChange,
      selectedItems: categories,
    });
  };

  const openMusicTypesFilter = () => {
    navigation.navigate('VenueFilterList', {
      title: __('venueFilterScreen.musicTypes'),
      items: musicTypeItems,
      onChange: onMusicTypesChange,
      selectedItems: musicTypes,
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

  const submit = () => navigation.dismiss();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <LongListFilterPreview
          style={styles.categories}
          name={__('venueFilterScreen.categories')}
          items={categoryItems}
          selectedItems={categories}
          onPress={openCategoryFilter}
        />
        <FilterSection title={__('venueFilterScreen.timeline')}>
          <BooleanFilter
            label={__('venueFilterScreen.nowOpen')}
            onValueChange={onTimeFilterChange('openTime')}
            value={!!timeFilters.openTime}
          />
          <BooleanFilter
            label={__('venueFilterScreen.nowBusy')}
            onValueChange={onTimeFilterChange('busyTime')}
            value={!!timeFilters.busyTime}
          />
          <BooleanFilter
            label={__('venueFilterScreen.nowDancing')}
            onValueChange={onTimeFilterChange('dancingTime')}
            value={!!timeFilters.dancingTime}
          />
          <BooleanFilter
            label={__('venueFilterScreen.terraceOpen')}
            onValueChange={onTimeFilterChange('terraceTime')}
            value={!!timeFilters.terraceTime}
          />
        </FilterSection>
        <LongListFilterPreview
          name={__('venueFilterScreen.musicTypes')}
          items={musicTypeItems}
          selectedItems={musicTypes}
          onPress={openMusicTypesFilter}
        />
        <ListFilter
          allowSingle={true}
          items={dresscodeItems}
          selectedItems={dresscode}
          onChange={onDresscodeChange}
          name={__('venueFilterScreen.dresscode')}
        />
        <ListFilter
          items={paymentMethodItems}
          selectedItems={paymentMethods}
          onChange={onPaymentMethodChange}
          name={__('venueFilterScreen.paymentMethods')}
        />
        <FilterSection title={__('venueFilterScreen.facilities')}>
          {FACILITY_FILTERS.map(facility => (
            <BooleanFilter
              key={facility}
              label={__(`venueFilterScreen.${facility}`)}
              onValueChange={onFacilityFilterChange(facility)}
              value={facilityFilters.includes(facility)}
            />
          ))}
        </FilterSection>
        <LongListFilterPreview
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
});
