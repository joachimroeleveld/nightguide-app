import { call, fork, put, takeLatest, select } from 'redux-saga/effects';

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
  fetchVenues,
  QUERY_VENUES,
} from './actions';
import { getCurrentLocation } from '../location';

function* fetchVenueSaga() {
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

function* fetchExploreVenuesSaga() {
  yield takeLatest(FETCH_EXPLORE_VENUES, function*(action) {
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

function* fetchVenuesSaga() {
  yield takeLatest(FETCH_VENUES, function*(action) {
    let { filters, sort, query, fields, offset, limit } = action.payload;

    const params = {
      offset,
      limit,
      filters,
      sort,
      fields,
      query,
    };

    const currentLocation = yield select(getCurrentLocation);

    // Sort by distance by default
    if (!sort && currentLocation) {
      params.sort = [{ distance: 1 }];
      params.latitude = currentLocation.latitude;
      params.longitude = currentLocation.longitude;
    }

    try {
      const results = yield call(api.venues.getVenues, params);
      const reachedEnd = results.length < limit;

      yield put(fetchVenuesSuccess({ results, reachedEnd }));
    } catch (error) {
      yield put(fetchVenuesError(error));
    }
  });
}

function* queryVenuesSaga() {
  yield takeLatest(QUERY_VENUES, function*(action) {
    let { text, ...otherParams } = action.payload;

    if (!text || (text && text.length >= 2)) {
      yield put(fetchVenues({ query: text, ...otherParams }));
    } else if (text) {
      yield put(fetchVenuesSuccess([]));
    }
  });
}

export default function* rootSaga() {
  yield [
    fork(fetchExploreVenuesSaga),
    fork(fetchVenuesSaga),
    fork(fetchVenueSaga),
    fork(queryVenuesSaga),
  ];
}
