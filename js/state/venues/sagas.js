import { call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';

import api from '../../services/api';
import {
  FETCH_VENUE,
  fetchVenueSuccess,
  fetchVenueError,
  FETCH_EXPLORE_VENUES,
  fetchExploreVenuesSuccess,
  fetchExploreVenuesError,
  FETCH_VENUES,
  fetchVenuesSuccess,
  fetchVenuesError,
} from './actions';

export function* fetchVenue() {
  yield takeLatest(FETCH_VENUE, function*(action) {
    const { venueId } = action.payload;

    try {
      const results = yield call(api.venues.getVenue, venueId);

      yield put(fetchVenueSuccess(results));
    } catch (error) {
      yield put(fetchVenueError(error));
    }
  });
}

export function* fetchExploreVenues() {
  yield takeEvery(FETCH_EXPLORE_VENUES, function*(action) {
    const { tag } = action.payload;

    try {
      const results = yield call(api.venues.getVenues, {
        filters: {
          tag,
        },
      });

      yield put(fetchExploreVenuesSuccess(results));
    } catch (error) {
      yield put(
        fetchExploreVenuesError({
          tag,
          error,
        })
      );
    }
  });
}

export function* fetchVenues() {
  yield takeEvery(FETCH_VENUES, function*(action) {
    const { filters, sort, fields, offset, limit } = action.payload;

    try {
      const results = yield call(api.venues.getVenues, {
        offset,
        limit,
        filters,
        sort,
        fields,
      });

      yield put(fetchVenuesSuccess(results));
    } catch (error) {
      yield put(fetchVenuesError(error));
    }
  });
}

export default function* root() {
  yield [fork(fetchExploreVenues), fork(fetchVenues), fork(fetchVenue)];
}
