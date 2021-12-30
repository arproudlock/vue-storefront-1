/**
 * Capitalize first letter of provided text
 * @param {String} value
 */
export function decimal2 (value) {
  if (!value) return '';
  let formattedVal = Math.abs(parseFloat(value)).toFixed(2);
  return formattedVal;
}
