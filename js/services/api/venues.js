import { request } from './index';

export function getVenues({ skip, limit, filters, sort, fields }) {
  return request({
    path: '/venues',
    method: 'GET',
    qs: {
      skip,
      limit,
      filters,
      sort,
      fields,
    },
  }).then(data => data.results);
}

export function getVenue(venueId) {
  return request({
    path: `/venues/${venueId}`,
    method: 'GET',
  });
}
