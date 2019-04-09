import { request } from './index';

export function getVenues({
  offset,
  limit,
  filter,
  sort,
  fields,
  latitude,
  longitude,
  query,
}) {
  const qs = {
    offset,
    limit,
    filter,
    query,
    fields,
    latitude,
    longitude,
  };

  if (sort && sort.length) {
    qs.sortBy = sort.map(obj => {
      const by = Object.keys(obj)[0];
      const order = obj[by] === 1 ? 'asc' : 'desc';
      return `${by},${order}`;
    });
  }

  return request({
    path: '/venues',
    method: 'GET',
    qs,
  });
}

export function getVenue(venueId) {
  return request({
    path: `/venues/${venueId}`,
    method: 'GET',
  });
}
