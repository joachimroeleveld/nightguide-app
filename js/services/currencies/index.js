/**
 * Format an amount in a currency
 * @param amount
 * @param decimals
 * @param removeTrailingZeros
 * @returns {string}
 */
export function formatAmount(
  amount,
  decimals = 2,
  removeTrailingZeros = false
) {
  let val =
    '€' +
    Number(amount)
      .toFixed(decimals)
      .replace('.', ',');
  if (removeTrailingZeros) {
    val = val.replace(/,0+/, '');
  }
  return val;
}
