/**
 * Return properties that are present in the source Object, but not in the valid Object and are not ignored
 *
 * @param {Object} srcProps Source Properties
 * @param {Object} validProps List of Valid Properties
 * @param {Array} ignoreProps List of Properties to ignore, even if they are not valid
 * @returns Array with exclude properties
 */
function excludeFilter(srcProps = {}, validProps = {}, ignoreProps = []) {
  return Object.keys(srcProps).filter(prop => !validProps.hasOwnProperty(prop) && ignoreProps.indexOf(prop) === -1);
}

module.exports = excludeFilter;
