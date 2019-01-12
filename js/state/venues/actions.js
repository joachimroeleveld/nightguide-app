import { createActions } from 'redux-actions';

export const FETCH_VENUES = 'FETCH_VENUES';
export const FETCH_VENUES_SUCCESS = 'FETCH_VENUES_SUCCESS';
export const FETCH_VENUES_ERROR = 'FETCH_VENUES_ERROR';

export const FETCH_EXPLORE_VENUES = 'FETCH_EXPLORE_VENUES';
export const FETCH_EXPLORE_VENUES_SUCCESS = 'FETCH_EXPLORE_VENUES_SUCCESS';
export const FETCH_EXPLORE_VENUES_ERROR = 'FETCH_VENUE_EXPLORES_ERROR';

export const {
  fetchVenues,
  fetchVenuesSuccess,
  fetchVenuesError,
  fetchExploreVenues,
  fetchExploreVenuesSuccess,
  fetchExploreVenuesError,
} = createActions(
  FETCH_VENUES,
  FETCH_VENUES_SUCCESS,
  FETCH_VENUES_ERROR,
  FETCH_EXPLORE_VENUES,
  FETCH_EXPLORE_VENUES_SUCCESS,
  FETCH_EXPLORE_VENUES_ERROR
);
