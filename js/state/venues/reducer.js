import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import _ from 'lodash';

import {
  fetchVenue,
  fetchVenueSuccess,
  fetchVenueError,
  fetchVenues,
  fetchVenuesSuccess,
  fetchVenuesError,
  fetchExploreVenues,
  fetchExploreVenuesSuccess,
  fetchExploreVenuesError,
  resetVenue,
  queryVenues,
  resetVenuesQuery,
} from './actions';

export default handleActions(
  {
    [fetchVenue]: (state, action) =>
      update(state, {
        current: {
          isFetching: { $set: true },
          error: { $set: null },
        },
      }),
    [fetchVenueSuccess]: (state, action) =>
      update(state, {
        current: {
          isFetching: { $set: false },
          data: { $set: action.payload },
        },
      }),
    [fetchVenueError]: (state, action) =>
      update(state, {
        current: {
          isFetching: { $set: false },
          error: { $set: action.payload },
        },
      }),
    [resetVenue]: (state, action) =>
      update(state, {
        current: {
          isFetching: { $set: false },
          data: { $set: null },
        },
      }),
    [fetchExploreVenues]: (state, action) =>
      update(state, {
        byTag: {
          [action.payload.tag]: () => {
            const values = state.byTag[action.payload.tag];
            return {
              isFetching: true,
              error: null,
              byId: values.byId || {},
              allIds: values.allIds || [],
            };
          },
        },
      }),
    [fetchExploreVenuesSuccess]: (state, action) =>
      update(state, {
        byTag: {
          [action.payload.tag]: {
            isFetching: { $set: false },
            byId: {
              $merge: _.keyBy(action.payload.results, 'id'),
            },
            allIds: {
              $push: action.payload.map(venue => venue.id),
            },
          },
        },
      }),
    [fetchExploreVenuesError]: (state, action) =>
      update(state, {
        byTag: {
          [action.payload.tag]: {
            isFetching: { $set: false },
            error: { $set: action.payload.error },
          },
        },
      }),
    [fetchVenues]: (state, action) =>
      update(state, {
        list: {
          isFetching: { $set: true },
          error: { $set: null },
          query: { $set: action.payload.query || null },
          filters: { $set: action.payload.filters || null },
          sort: { $set: action.payload.sort || null },
        },
      }),
    [fetchVenuesSuccess]: (state, action) =>
      update(state, {
        list: {
          isFetching: { $set: false },
          byId: {
            $set: _.keyBy(action.payload, 'id'),
          },
          allIds: {
            $set: action.payload.map(venue => venue.id),
          },
        },
      }),
    [fetchVenuesError]: (state, action) =>
      update(state, {
        list: {
          isFetching: { $set: false },
          error: { $set: action.payload },
        },
      }),
    [queryVenues]: (state, action) =>
      update(state, {
        list: {
          query: { $set: action.payload.text },
        },
      }),
    [resetVenuesQuery]: (state, action) =>
      update(state, {
        list: {
          query: { $set: null },
        },
      }),
  },
  {
    byTag: {},
    list: {
      isFetching: false,
      error: null,
      byId: {},
      allIds: [],
      query: null,
      filters: {},
      sort: null,
    },
    current: {
      isFetching: false,
      error: null,
      data: null,
    },
    city: 'Utrecht',
  }
);
