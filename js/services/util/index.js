import { createSelectorCreator, defaultMemoize } from 'reselect';
import _ from 'lodash';

/**
 * Format a number (e.g. 1.000.000)
 */
export function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  _.isEqual
);
