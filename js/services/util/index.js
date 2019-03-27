/**
 * Format a number (e.g. 1.000.000)
 */
export function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
