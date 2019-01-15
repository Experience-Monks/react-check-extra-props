const _unspecifiedPropsFilter = require('./exclude-filter');

const BASE_IGNORE_LIST = [
  'children',
  'history',
  'location',
  'params',
  'route',
  'routes',
  'routeParams',
  'context',
  'slug',
  'fn',
  'match',
  'staticContext'
];

/**
 * Check if there are unused properties or properties that were not set
 *
 * @export
 * @param {any} propTypes
 * @param {any} [ignoreData=[]]
 * @returns {Boolean}
 */
function extraPropertiesChecker(propTypes = {}, ignoreData = []) {
  const ignoreList = BASE_IGNORE_LIST.concat(ignoreData);

  return {
    ...propTypes,
    fn: function(props, self, componentName) {
      const unspecifiedProps = _unspecifiedPropsFilter(props, propTypes, ignoreList);

      if (unspecifiedProps.length) {
        console.warn(`Component ${componentName} has unspecified props: ${unspecifiedProps.join(', ')}`);
      }
    }
  };
}

module.exports = extraPropertiesChecker;
