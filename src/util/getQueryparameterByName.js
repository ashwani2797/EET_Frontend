/**
 * @module utils
 */
/**
 * Get the value of a query parameter in the URL
 *
 * @param {string} name - query parameter name
 * @param {string} url - url in which to look for the query parameter
 * @returns {string} value of input query parameter
 */
const getQueryParameterByName = (name, url) => {
    if (!url) {
      url = window.location.href; // eslint-disable-line
    }
    name = name.replace(/[\[\]]/g, '\\$&'); // eslint-disable-line
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`), // eslint-disable-line
      results = regex.exec(url);
    if (!results) {
      return null;
    } else if (!results[2]) {
      return '';
    }
  
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };
  
  module.exports = getQueryParameterByName;
  