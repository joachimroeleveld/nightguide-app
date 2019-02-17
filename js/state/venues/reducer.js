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
        },
      }),
    [fetchVenuesSuccess]: (state, { payload: { results, reachedEnd } }) =>
      update(state, {
        list: {
          isFetching: { $set: false },
          reachedEnd: { $set: reachedEnd },
          byId: {
            $merge: _.keyBy(results, 'id'),
          },
          allIds: {
            $push: results.map(venue => venue.id),
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
          reachedEnd: { $set: false },
          byId: { $set: {} },
          allIds: { $set: [] },
          query: { $set: action.payload.text || null },
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
      reachedEnd: false,
    },
    current: {
      isFetching: false,
      error: null,
      data: null,
    },
    city: 'Utrecht',
  }
);
