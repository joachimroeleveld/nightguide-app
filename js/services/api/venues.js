import { request } from './index';

export function getVenues({
  offset,
  limit,
  filters,
  sort,
  fields,
  latitude,
  longitude,
  query,
}) {
  const qs = {
    offset,
    limit,
    filters,
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
  }).then(data => data.results);
}

export function getVenue(venueId) {
  return request({
    path: `/venues/${venueId}`,
    method: 'GET',
  });
}
