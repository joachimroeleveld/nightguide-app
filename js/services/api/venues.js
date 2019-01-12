import { request } from './index';
import { normalize } from 'normalizr';

import venue from './venues';

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
