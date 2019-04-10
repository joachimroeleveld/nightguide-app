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
  FILTER_VENUES,
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
    let { filter = {}, sort, query, fields, offset, limit } = action.payload;

    // TODO: make dynamic
    filter.city = 'Utrecht';
    filter.country = 'NL';

    const params = {
      offset,
      limit,
      sort,
      fields,
      query,
      filter,
    };

    const currentLocation = yield select(getCurrentLocation);

    // Sort by distance by default
    if (!sort && currentLocation) {
      params.sort = [{ distance: 1 }];
      params.latitude = currentLocation.latitude;
      params.longitude = currentLocation.longitude;
    }

    try {
      const { results, totalCount } = yield call(api.venues.getVenues, params);

      yield put(fetchVenuesSuccess({ results, totalCount }));
    } catch (error) {
      yield put(fetchVenuesError(error));
    }
  });
}

function* queryVenuesSaga() {
  yield takeLatest(QUERY_VENUES, function*(action) {
    let { query, ...otherParams } = action.payload;

    if (!query || query.length >= 2) {
      yield put(fetchVenues({ query, ...otherParams }));
    } else if (query) {
      yield put(fetchVenuesSuccess({ results: [] }));
    }
  });
}

function* filterVenuesSaga() {
  yield takeLatest(FILTER_VENUES, function*(action) {
    yield put(fetchVenues(action.payload));
  });
}

export default function* rootSaga() {
  yield [
    fork(fetchExploreVenuesSaga),
    fork(fetchVenuesSaga),
    fork(fetchVenueSaga),
    fork(queryVenuesSaga),
    fork(filterVenuesSaga),
  ];
}
