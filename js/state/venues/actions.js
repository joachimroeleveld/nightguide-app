import { createActions } from 'redux-actions';

export const FETCH_VENUES = 'FETCH_VENUES';
export const FETCH_VENUES_SUCCESS = 'FETCH_VENUES_SUCCESS';
export const FETCH_VENUES_ERROR = 'FETCH_VENUES_ERROR';

export const FETCH_VENUE = 'FETCH_VENUE';
export const FETCH_VENUE_SUCCESS = 'FETCH_VENUE_SUCCESS';
export const FETCH_VENUE_ERROR = 'FETCH_VENUE_ERROR';
export const RESET_VENUE = 'RESET_VENUE';

export const FETCH_EXPLORE_VENUES = 'FETCH_EXPLORE_VENUES';
export const FETCH_EXPLORE_VENUES_SUCCESS = 'FETCH_EXPLORE_VENUES_SUCCESS';
export const FETCH_EXPLORE_VENUES_ERROR = 'FETCH_VENUE_EXPLORES_ERROR';

export const QUERY_VENUES = 'QUERY_VENUES';
export const FILTER_VENUES = 'FILTER_VENUES';

export const {
  fetchVenues,
  fetchVenuesSuccess,
  fetchVenuesError,
  fetchVenue,
  resetVenue,
  fetchVenueSuccess,
  fetchVenueError,
  fetchExploreVenues,
  fetchExploreVenuesSuccess,
  fetchExploreVenuesError,
  queryVenues,
  filterVenues,
} = createActions(
  FETCH_VENUES,
  FETCH_VENUES_SUCCESS,
  FETCH_VENUES_ERROR,
  FETCH_VENUE,
  RESET_VENUE,
  FETCH_VENUE_SUCCESS,
  FETCH_VENUE_ERROR,
  FETCH_EXPLORE_VENUES,
  FETCH_EXPLORE_VENUES_SUCCESS,
  FETCH_EXPLORE_VENUES_ERROR,
  QUERY_VENUES,
  FILTER_VENUES,
);
