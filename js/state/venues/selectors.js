import _ from 'lodash';
import { createSelector } from 'reselect';

export const makeGetVenueList = () =>
  createSelector(
    state => state.venues.list.byId,
    state => state.venues.list.allIds,
    (venues, ids) =>
      Object.values(venues).sort((venueA, venueB) =>
        ids.indexOf(venueA.id) > ids.indexOf(venueB.id) ? 1 : -1
      )
  );

export const getVenueCount = state => state.venues.list.allIds.length;

export const getVenueFilterCount = state =>
  Object.keys(_.omit(state.venues.list.filter, ['city', 'country'])).length;
