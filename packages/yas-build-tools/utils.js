/**
 * @param {string} value
 * @returns {string}
 */
function serializeValue(value) {
  return value === undefined ? "undefined" : JSON.stringify(value);
}

module.exports = { serializeValue };
