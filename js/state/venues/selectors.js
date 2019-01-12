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
