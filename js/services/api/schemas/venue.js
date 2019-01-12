import { schema } from 'normalizr';

const tag = new schema.Entity('tags', {});

const venue = new schema.Entity('venues', {
  tags: [tag],
});

export default venue;
