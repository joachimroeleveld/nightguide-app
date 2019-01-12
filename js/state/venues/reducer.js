import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import _ from 'lodash';

import {
  fetchVenues,
  fetchVenuesSuccess,
  fetchVenuesError,
  fetchExploreVenues,
  fetchExploreVenuesSuccess,
  fetchExploreVenuesError,
} from './actions';

export default handleActions(
  {
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
    [fetchVenues]: (state, action) => {
      const resetData = _.isEqual(
        _.pick(state.list, ['filters', 'sort']),
        _.pick(action.payload, ['filters', 'sort'])
      );
      // Reset data if sort/filters have changed
      const data = resetData ? [] : state.list.data;
      return update(state, {
        list: {
          isFetching: { $set: true },
          error: { $set: null },
          data: { $set: data },
          filters: { $set: action.payload.filters || null },
          sort: { $set: action.payload.sort || null },
        },
      });
    },
    [fetchVenuesSuccess]: (state, action) =>
      update(state, {
        list: {
          isFetching: { $set: false },
          byId: {
            $merge: _.keyBy(action.payload, 'id'),
          },
          allIds: {
            $push: action.payload.map(venue => venue.id)
          },
        },
      }),
    [fetchVenuesError]: (state, action) =>
      update(state, {
        sendFeedback: {
          isFetching: { $set: false },
          error: { $set: action.payload },
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
      filters: null,
      sort: null,
    },
    current: {},
  }
);
