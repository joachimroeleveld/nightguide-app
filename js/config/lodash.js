import _ from 'lodash';

_.mixin({
  pascalCase: _.flow(
    _.camelCase,
    _.upperFirst
  ),
});
